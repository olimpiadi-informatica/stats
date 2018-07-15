#!/usr/bin/env python3
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

# Given an xlsx filed exported from Google Docs with the scoreboards build the
# database and join the redoundant data.

import os
from collections import OrderedDict

import argparse
import datetime
import hashlib
import openpyxl
import string
import sqlite3
from typing import Optional, Dict, List

STATIC_COLUMNS = {"position", "name", "surname", "birth", "school", "medal", "gender", "venue", "IOI", "score"}


class User:
    def __init__(self, name: str, surname: str, birth: Optional[datetime.datetime], gender: str, **kwargs):
        self.name = name
        self.surname = surname
        self.birth = None  # type: Optional[datetime.date]
        if birth is not None:
            self.birth = birth.date()
        self.gender = gender

    def __eq__(self, other: "User"):
        if self.name != other.name or self.surname != other.surname:
            return False
        if self.birth is None:
            self.birth = other.birth
            return True
        if other.birth is None:
            other.birth = self.birth
            return True
        return self.birth == other.birth

    def id(self) -> str:
        return hashlib.md5(("%s:%s:%s" % (self.name, self.surname, self.birth)).encode()).hexdigest()

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO users (id, name, surname, birth, gender) VALUES " \
                "(:id, :name, :surname, :birth, :gender)"
        try:
            cursor.execute(query, {"id": self.id(), "name": self.name, "surname": self.surname, "birth": self.birth,
                                   "gender": self.gender})
        except Exception as e:
            print("Failed to insert user", self)
            print(e)

    def __hash__(self):
        return hash(self.name) ^ hash(self.surname)

    def __repr__(self):
        return "<User %s %s -- %s>" % (self.name, self.surname, str(self.birth))


class Contest:
    def __init__(self, year: int, location: Optional[str], region: Optional[str], maps: Optional[str]):
        self.year = year
        self.location = location
        self.region = region
        self.maps = maps

    def id(self) -> str:
        return str(self.year)

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO contests (year, location, region, maps) VALUES " \
                "(:year, :location, :region, :maps)"
        try:
            cursor.execute(query, {"year": self.year, "location": self.location, "region": self.region,
                                   "maps": self.maps})
        except Exception as e:
            print("Failed to insert contest", self)
            print(e)

    def __repr__(self):
        return "<Contest year=%s>" % self.year


class Task:
    def __init__(self, name: str, contest: Contest, index: int, max_score: float):
        self.name = name
        self.contest = contest
        self.index = index
        self.max_score = max_score

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.name)

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO tasks (name, contest_year, \"index\", max_score) VALUES " \
                "(:name, :contest_year, :index, :max_score)"
        try:
            cursor.execute(query, {"name": self.name, "contest_year": self.contest.year, "index": self.index,
                                   "max_score": self.max_score})
        except Exception as e:
            print("Failed to insert task", self)
            print(e)

    def __repr__(self):
        return "<Task name=%s contest=%s index=%d>" % (self.name, self.contest, self.index)


class Participation:
    def __init__(self, user: User, contest: Contest, position: Optional[int], school: Optional[str],
                 venue: Optional[str], medal: Optional[str], IOI: Optional[bool], score: Optional[float], **kwargs):
        self.user = user
        self.contest = contest
        self.position = position
        self.school = school
        self.venue = venue
        self.medal = medal
        self.IOI = IOI
        self.score = score

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.user.id())

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO participations (user_id, contest_year, position, school, venue, region, medal, IOI, " \
                "score) " \
                "VALUES (:user_id, :contest_year, :position, :school, :venue, :region, :medal, :IOI, :score)"
        try:
            region = self.venue[:3] if self.venue else None
            cursor.execute(query, {"user_id": self.user.id(), "contest_year": self.contest.year,
                                   "position": self.position, "school": self.school, "venue": self.venue,
                                   "region": region, "medal": self.medal, "IOI": self.IOI, "score": self.score})
        except Exception as e:
            print("Failed to insert participation", self)
            print(e)

    def __repr__(self):
        return "<Participation user=%s contest=%s>" % (self.user, self.contest)


class TaskScore:
    def __init__(self, task: Task, participation: Participation, score: Optional[float]):
        self.task = task
        self.participation = participation
        self.score = score
        assert task.contest == participation.contest

    def id(self) -> str:
        return "%s-%s" % (self.task.id(), self.participation.user.id())

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO task_scores (task_name, contest_year, user_id, score) VALUES " \
                "(:task_name, :contest_year, :user_id, :score)"
        try:
            cursor.execute(query, {"task_name": self.task.name, "contest_year": self.task.contest.year,
                                   "user_id": self.participation.user.id(), "score": self.score})
        except Exception as e:
            print("Failed to insert task_score", self)
            print(e)

    def __repr__(self):
        return "<TaskScore task=%s participation=%s score=%s>" % (self.task, self.participation, self.score)


def dictify(sheet):
    columns = []
    for col in string.ascii_uppercase:
        if sheet[col + "1"].value:
            columns.append((col, sheet[col + "1"].value))
    row_index = 2
    data = []
    while True:
        line = [x.value for x in sheet[columns[0][0] + str(row_index):columns[-1][0] + str(row_index)][0]]
        if not any(line):
            break
        row_index += 1
        data.append(OrderedDict(zip([x[1] for x in columns], line)))
    return data


def create_schema(cursor: sqlite3.Cursor):
    cursor.executescript("""
        PRAGMA FOREIGN_KEYS = ON;
        PRAGMA JOURNAL_MODE = WAL;
        PRAGMA SYNCHRONOUS = NORMAL;

        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            birth TEXT,
            gender TEXT
        );
        CREATE TABLE contests (
            year INT PRIMARY KEY,
            location TEXT,
            region TEXT,
            maps TEXT
        );
        CREATE TABLE participations (
            user_id TEXT NOT NULL,
            contest_year INT NOT NULL,
            position INT,
            school TEXT,
            venue TEXT,
            region TEXT,
            medal TEXT,
            IOI BOOLEAN,
            score FLOAT,
            PRIMARY KEY (user_id, contest_year),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (contest_year) REFERENCES contests(year)
        );
        CREATE TABLE tasks (
            name TEXT NOT NULL,
            contest_year INT NOT NULL,
            "index" INT NOT NULL,
            max_score FLOAT,
            PRIMARY KEY (name, contest_year),
            FOREIGN KEY (contest_year) REFERENCES contests(year)
        );
        CREATE TABLE task_scores (
            task_name TEXT NOT NULL,
            contest_year INT NOT NULL,
            user_id TEXT NOT NULL,
            score FLOAT,
            PRIMARY KEY (task_name, contest_year, user_id),
            FOREIGN KEY (task_name, contest_year) REFERENCES tasks(name, contest_year),
            FOREIGN KEY (user_id, contest_year) REFERENCES participations(user_id, contest_year)
        );
    """)


def add_users(cursor: sqlite3.Cursor, users: Dict[User, User]):
    for user in users:
        user.add_to_db(cursor)


def add_contests(cursor: sqlite3.Cursor, contests: Dict[int, Contest]):
    for contest in contests.values():
        contest.add_to_db(cursor)


def add_participations(cursor: sqlite3.Cursor, participations: List[Participation]):
    for participation in participations:
        participation.add_to_db(cursor)


def add_tasks(cursor: sqlite3.Cursor, tasks: Dict[str, Task]):
    for task in tasks.values():
        task.add_to_db(cursor)


def add_task_scores(cursor: sqlite3.Cursor, task_scores: List[TaskScore]):
    for task_score in task_scores:
        task_score.add_to_db(cursor)


def main(args):
    wb = openpyxl.load_workbook(args.file, data_only=True)
    sheets = wb.sheetnames

    users = dict()
    contests = dict()
    tasks = dict()
    participations = list()
    task_scores = list()

    task_sheet = wb["tasks"]
    max_scores = dict((task["task_name"], task["max_score"]) for task in dictify(task_sheet))

    contests_sheet = wb["contests"]
    locations = dict((int(contest["year"]), contest) for contest in dictify(contests_sheet))

    for sheet_name in reversed(sheets):
        if not sheet_name.isdigit():
            continue
        year = int(sheet_name)
        contest = Contest(year, locations[year]["location"], locations[year]["region"], locations[year]["maps"])
        contests[year] = contest

        raw_participations = dictify(wb[sheet_name])
        task_names = list(raw_participations[0].keys())[len(STATIC_COLUMNS):]
        for index, task_name in enumerate(task_names):
            tasks[task_name] = Task(task_name, contest, index, max_scores[task_name] or None)
        for raw_user in raw_participations:
            user = User(**raw_user)
            users[user] = user
            participation = Participation(user, contest, **raw_user)
            participations.append(participation)
            for task_name in task_names:
                task_score = TaskScore(tasks[task_name], participation, raw_user[task_name])
                task_scores.append(task_score)

    if args.drop and os.path.exists(args.db):
        os.unlink(args.db)
    database = sqlite3.connect(args.db,
                               check_same_thread=False,
                               isolation_level=None,
                               detect_types=sqlite3.PARSE_DECLTYPES)
    cursor = database.cursor()
    create_schema(cursor)

    add_users(cursor, users)
    add_contests(cursor, contests)
    add_participations(cursor, participations)
    add_tasks(cursor, tasks)
    add_task_scores(cursor, task_scores)

    database.close()


if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument("file", help="XLSX export from Google Drive")
    args.add_argument("db", help="SQLite3 file for the db")
    args.add_argument("--drop", help="Drop the db", action="store_true")
    main(args.parse_args())

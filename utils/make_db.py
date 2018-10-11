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
import numpy as np

STATIC_COLUMNS = {"position", "name", "surname", "birth", "school", "medal", "gender", "venue", "IOI", "score"}
REGION_NAMES = {
    "ABR": "Abruzzo",
    "BAS": "Basilicata",
    "CAL": "Calabria",
    "CAM": "Campania",
    "EMI": "Emilia-Romagna",
    "FRI": "Friuli-Venezia Giulia",
    "LAZ": "Lazio",
    "LIG": "Liguria",
    "LOM": "Lombardia",
    "MAR": "Marche",
    "MOL": "Molise",
    "PIE": "Piemonte",
    "PUG": "Puglia",
    "SAR": "Sardegna",
    "SIC": "Sicilia",
    "TOS": "Toscana",
    "TRE": "Trentino-Alto Adige",
    "UMB": "Umbria",
    "VAL": "Valle d'Aosta",
    "VEN": "Veneto"
}

DB_SCHEMA = """
PRAGMA FOREIGN_KEYS = ON;
PRAGMA JOURNAL_MODE = WAL;
PRAGMA SYNCHRONOUS = NORMAL;

CREATE TABLE regions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE VIRTUAL TABLE regions_fts4 USING fts4(id, name);
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT,
    surname TEXT NOT NULL,
    birth TEXT,
    gender TEXT
);
CREATE VIRTUAL TABLE users_fts4 USING fts4(id, name, surname);
CREATE TABLE contests (
    year UNSIGNED INT PRIMARY KEY,
    location TEXT,
    gmaps TEXT,
    latitude FLOAT,
    longitude FLOAT,
    region TEXT,
    FOREIGN KEY (region) REFERENCES regions(id)
);
CREATE VIRTUAL TABLE contests_fts4 USING fts4(year, location, region, full_region);
CREATE TABLE participations (
    user_id TEXT NOT NULL,
    contest_year UNSIGNED INT NOT NULL,
    position INT,
    school TEXT,
    venue TEXT,
    region TEXT,
    medal TEXT,
    IOI BOOLEAN,
    score FLOAT,
    PRIMARY KEY (user_id, contest_year),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (contest_year) REFERENCES contests(year),
    FOREIGN KEY (region) REFERENCES regions(id)
);
CREATE TABLE tasks (
    name TEXT NOT NULL,
    contest_year UNSIGNED INT NOT NULL,
    "index" INT NOT NULL,
    max_score FLOAT,
    title TEXT NOT NULL,
    link TEXT,
    PRIMARY KEY (name, contest_year),
    FOREIGN KEY (contest_year) REFERENCES contests(year)
);
CREATE VIRTUAL TABLE tasks_fts4 USING fts4(name, contest_year, title, link);
CREATE TABLE task_scores (
    task_name TEXT NOT NULL,
    contest_year UNSIGNED INT NOT NULL,
    user_id TEXT NOT NULL,
    score FLOAT,
    PRIMARY KEY (task_name, contest_year, user_id),
    FOREIGN KEY (task_name, contest_year) REFERENCES tasks(name, contest_year),
    FOREIGN KEY (user_id, contest_year) REFERENCES participations(user_id, contest_year)
);
"""

class User:
    def __init__(self, name: str, surname: str, birth: Optional[datetime.datetime], gender: str, **kwargs):
        self.name = name
        self.surname = surname
        self.birth = None  # type: Optional[datetime.date]
        if birth is not None and isinstance(birth, datetime.datetime):
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
        query_fts = "INSERT INTO users_fts4 (id, name, surname) VALUES " \
                    "(:id, :name, :surname)"
        try:
            cursor.execute(query, {"id": self.id(), "name": self.name, "surname": self.surname, "birth": self.birth,
                                   "gender": self.gender})
            cursor.execute(query_fts, {"id": self.id(), "name": self.name, "surname": self.surname})
        except Exception as e:
            print("Failed to insert user", self)
            print(e)

    def __hash__(self):
        return hash(self.name) ^ hash(self.surname)

    def __repr__(self):
        return "<User %s %s -- %s id=%s>" % (self.name, self.surname, str(self.birth), self.id())


class Contest:
    def __init__(self, year: int, location: Optional[str], region: Optional[str], gmaps: Optional[str], latitude: Optional[float], longitude: Optional[float]):
        self.year = year
        self.location = location
        self.region = region
        self.gmaps = gmaps
        self.latitude = latitude
        self.longitude = longitude

    def id(self) -> str:
        return str(self.year)

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO contests (year, location, region, gmaps, latitude, longitude) VALUES " \
                "(:year, :location, :region, :gmaps, :latitude, :longitude)"
        query_fts = "INSERT INTO contests_fts4 (year, location, region, full_region) VALUES " \
                "(:year, :location, :region, :full_region)"
        try:
            cursor.execute(query, {"year": self.year, "location": self.location, "region": self.region,
                                   "gmaps": self.gmaps, "latitude": self.latitude, "longitude": self.longitude})
            cursor.execute(query_fts, {"year": self.year, "location": self.location, "region": self.region,
                                       "full_region": REGION_NAMES.get(self.region, None)})
        except Exception as e:
            print("Failed to insert contest", self)
            print(e)

    def __repr__(self):
        return "<Contest year=%s>" % self.year


class Task:
    def __init__(self, name: str, contest: Contest, index: int, max_score: float, title: str, link: Optional[str]):
        self.name = name
        self.contest = contest
        self.index = index
        self.max_score = max_score
        self.title = title
        self.link = link

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.name)

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = "INSERT INTO tasks (name, contest_year, \"index\", max_score, title, link) VALUES " \
                "(:name, :contest_year, :index, :max_score, :title, :link)"
        query_fts = "INSERT INTO tasks_fts4 (contest_year, name, title, link) VALUES " \
                "(:name, :contest_year, :title, :link)"
        try:
            cursor.execute(query, {"name": self.name, "contest_year": self.contest.year, "index": self.index,
                                   "max_score": self.max_score, "title": self.title, "link": self.link})
            cursor.execute(query_fts, {"name": self.name, "contest_year": self.contest.year,
                                       "title": self.title, "link": self.link})
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
    cursor.executescript(DB_SCHEMA)


def add_regions(cursor: sqlite3.Cursor, regions: Dict[str, str]):
    query = "INSERT INTO regions (id, name) VALUES (:id, :name)"
    query_fts = "INSERT INTO regions_fts4 (id, name) VALUES (:id, :name)"
    for id, name in regions.items():
        try:
            cursor.execute(query, {"id": id, "name": name})
            cursor.execute(query_fts, {"id": id, "name": name})
        except Exception as e:
            print("Failed to insert region", (id, name))
            print(e)

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


def get_task_coefficients(raw_participations: List[OrderedDict], task_names: List[str]):
    if raw_participations[0]["score"] is None or raw_participations[0][task_names[0]] is None:
        return [1]*len(task_names)
    try:
        for index in range(len(raw_participations)-len(task_names)):
            participations = raw_participations[index:index+len(task_names)]
            A = np.array([[p[task_name] for task_name in task_names] for p in participations])
            b = np.array([p["score"] for p in participations])
            if np.linalg.matrix_rank(A) == len(task_names) and np.all(A) and np.all(b):
                break
        x = np.linalg.solve(A, b)
        return list(map(lambda x: int(round(x)), x))
    except:
        return [1]*len(task_names)


def main(args):
    wb = openpyxl.load_workbook(args.file, data_only=True)
    sheets = wb.sheetnames

    users = dict()
    contests = dict()
    tasks = dict()
    participations = list()
    task_scores = list()

    task_sheet = wb["tasks"]
    task_meta = dict((task["task_name"], dict(task)) for task in dictify(task_sheet))

    contests_sheet = wb["contests"]
    locations = dict((int(contest["year"]), contest) for contest in dictify(contests_sheet))

    missing_venue = set()  # type: Set[str]
    known_venue = dict()  # type: Dict[str, str]

    for sheet_name in reversed(sheets):
        if not sheet_name.isdigit():
            continue
        year = int(sheet_name)
        contest = Contest(year, locations[year]["location"], locations[year]["region"], locations[year]["gmaps"], locations[year]["latitude"], locations[year]["longitude"])
        contests[year] = contest

        raw_participations = dictify(wb[sheet_name])
        task_names = list(raw_participations[0].keys())[len(STATIC_COLUMNS):]
        task_coefficients = dict(zip(task_names, get_task_coefficients(raw_participations, task_names)))

        for index, task_name in enumerate(task_names):
            meta = task_meta.get(task_name, dict())
            max_score = meta.get("max_score")
            title = meta.get("title")
            link = meta.get("link")
            if max_score:
                max_score *= task_coefficients[task_name]
            tasks[task_name] = Task(task_name, contest, index, max_score, title, link)

        for raw_user in raw_participations:
            user = User(**raw_user)
            users[user] = user
            participation = Participation(user, contest, **raw_user)
            if participation.venue is None:
                missing_venue.add(repr(user))
            elif repr(user) in missing_venue:
                missing_venue.remove(repr(user))
            if participation.venue is not None:
                known_venue[repr(user)] = participation.venue
            if repr(user) in known_venue and participation.venue is None:
                print("Deduced venue", user, "-->", known_venue[repr(user)])
                participation.venue = known_venue[repr(user)]
            participations.append(participation)
            for task_name in task_names:
                score = raw_user[task_name]
                if score:
                    score *= task_coefficients[task_name]
                task_score = TaskScore(tasks[task_name], participation, score)
                task_scores.append(task_score)

    for missing in missing_venue:
        print("Missing venue:", missing)

    if args.drop and os.path.exists(args.db):
        os.unlink(args.db)
    database = sqlite3.connect(args.db,
                               check_same_thread=False,
                               isolation_level=None,
                               detect_types=sqlite3.PARSE_DECLTYPES)
    cursor = database.cursor()
    create_schema(cursor)

    add_regions(cursor, REGION_NAMES)
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

#!/usr/bin/env python3

import argparse
import logging
import argparse
import sqlite3
from typing import Dict, List, OrderedDict, Set
import numpy as np

from db import *
from gdrive import *

logger = logging.getLogger("make_db")

STATIC_COLUMNS = {
    "position",
    "name",
    "surname",
    "birth",
    "school",
    "medal",
    "gender",
    "venue",
    "IOI",
    "score",
}


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
    """
    The score column is a linear combination of the scores of the tasks. This
    function tries to find the task coefficients.
    """
    if (
        raw_participations[0]["score"] is None
        or raw_participations[0][task_names[0]] is None
    ):
        return [1] * len(task_names)
    try:
        for index in range(len(raw_participations) - len(task_names)):
            participations = raw_participations[index : index + len(task_names)]
            A = np.array(
                [[p[task_name] for task_name in task_names] for p in participations]
            )
            b = np.array([p["score"] for p in participations])
            if np.linalg.matrix_rank(A) == len(task_names) and np.all(A) and np.all(b):
                break
        x = np.linalg.solve(A, b)
        return list(map(lambda x: int(round(x)), x))
    except:
        return [1] * len(task_names)


def main(args):
    if os.path.exists(args.db):
        if args.drop:
            os.unlink(args.db)
        else:
            raise RuntimeError("Pass --drop to overwrite the database")

    drive = Drive(args.spreadsheet_id, args.request_credentials)

    users = dict()
    contests = dict()
    tasks = dict()
    participations = list()
    task_scores = list()

    task_meta = {task["task_name"]: task for task in drive.get_table("tasks")}
    locations = {int(c["year"]): c for c in drive.get_table("contests")}

    missing_venue = set()  # type: Set[str]
    known_venue = dict()  # type: Dict[str, str]

    for year, location in locations.items():
        logger.info("Processing year %d", year)
        contest = Contest(
            year,
            location.get("location", None),
            location.get("region", None),
            location.get("gmaps", None),
            location.get("latitude", None),
            location.get("longitude", None),
        )
        contests[year] = contest

        raw_participations = drive.get_table(str(year))
        task_names = list(raw_participations[0].keys())
        task_names = task_names[task_names.index("score") + 1 :]
        task_coefficients = dict(
            zip(task_names, get_task_coefficients(raw_participations, task_names))
        )

        for index, task_name in enumerate(task_names):
            meta = task_meta.get(task_name, dict())
            max_score = meta.get("max_score", None)
            title = meta.get("title", None)
            link = meta.get("link", None)
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
                logger.debug("Deduced venue %s --> %s", user, known_venue[repr(user)])
                participation.venue = known_venue[repr(user)]
            participations.append(participation)
            for task_name in task_names:
                score = raw_user[task_name]
                if score:
                    score *= task_coefficients[task_name]
                task_score = TaskScore(tasks[task_name], participation, score)
                task_scores.append(task_score)

    for missing in missing_venue:
        logger.debug("Missing venue: %s", missing)

    database = sqlite3.connect(
        args.db,
        check_same_thread=False,
        isolation_level=None,
        detect_types=sqlite3.PARSE_DECLTYPES,
    )
    cursor = database.cursor()
    create_schema(cursor)

    add_regions(cursor, REGION_NAMES)
    add_users(cursor, users)
    add_contests(cursor, contests)
    add_participations(cursor, participations)
    add_tasks(cursor, tasks)
    add_task_scores(cursor, task_scores)

    database.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("spreadsheet_id", help="ID of the Google Drive spreadsheet")
    parser.add_argument("db", help="Where to write the database")
    parser.add_argument("--drop", help="Drop the db", action="store_true")
    parser.add_argument(
        "--request-credentials",
        help="Request the Google Drive credentials",
        action="store_true",
        default=False,
    )
    parser.add_argument("--verbose", help="Verbose output", action="store_true")

    args = parser.parse_args()
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
    )
    logging.getLogger("googleapiclient.discovery_cache").setLevel(logging.ERROR)

    main(args)

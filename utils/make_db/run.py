#!/usr/bin/env python3

import argparse
import logging
import argparse
from typing import Dict, List, OrderedDict, Set
import numpy as np
import shutil

from db import *
from gdrive import *

logger = logging.getLogger("make_db")

STATIC_COLUMNS = {
    "rank",
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
    if os.path.exists(args.storage_dir):
        if args.drop:
            shutil.rmtree(args.storage_dir)
        else:
            raise RuntimeError("Pass --drop to overwrite the database")

    drive = Drive(args.spreadsheet_id, args.request_credentials)

    storage = Storage(args.storage_dir)

    task_meta = {task["task_name"]: task for task in drive.get_table("tasks")}
    locations = {int(c["year"]): c for c in drive.get_table("contests")}

    missing_venue = set()  # type: Set[str]
    known_venue = dict()  # type: Dict[str, str]

    for year, location in list(locations.items())[-3:]:  # FIXME: remove slice
        logger.info("Processing year %d", year)
        contest = Contest(
            storage,
            year,
            location.get("location", None),
            location.get("region", None),
            location.get("gmaps", None),
            location.get("latitude", None),
            location.get("longitude", None),
        )
        storage.contests[year] = contest

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
            if max_score is not None:
                max_score = float(max_score) * task_coefficients[task_name]
            storage.tasks[year][task_name] = Task(
                storage, task_name, contest, index, max_score, title, link
            )

        for raw_user in raw_participations:
            user = User(storage, **raw_user)
            if user in storage.users:
                user = storage.users[user]
            else:
                storage.users[user] = user
            participation = Participation(storage, user, contest, **raw_user)
            if participation.venue is None:
                missing_venue.add(repr(user))
            elif repr(user) in missing_venue:
                missing_venue.remove(repr(user))
            if participation.venue is not None:
                known_venue[repr(user)] = participation.venue
            if repr(user) in known_venue and participation.venue is None:
                logger.debug("Deduced venue %s --> %s", user, known_venue[repr(user)])
                participation.venue = known_venue[repr(user)]
            storage.participations[year].append(participation)
            for task_name in task_names:
                score = raw_user[task_name]
                if score is not None:
                    score = float(score) * task_coefficients[task_name]
                task_score = TaskScore(
                    storage, storage.tasks[year][task_name], participation, score
                )
                storage.task_scores[year][task_name].append(task_score)

    for missing in missing_venue:
        logger.debug("Missing venue: %s", missing)

    storage.finish()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("spreadsheet_id", help="ID of the Google Drive spreadsheet")
    parser.add_argument("storage_dir", help="Where to write the files")
    parser.add_argument(
        "--drop",
        help="Drop the storage dir if it exists",
        action="store_true",
    )
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

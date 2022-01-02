from collections import defaultdict
import datetime
import hashlib
import os
import json
import sqlite3
from functools import cache, reduce, partial
from typing import Dict, List, Optional

# TODO:
# contests/{year}/results.json
# contests/{year}/regions.json (not used)
# home.json
# regions.json
# regions/{region}.json
# regions/{region}/results.json
# tasks.json
# tasks/{year}/{name}.json
# users.json
# users/{id}.json

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
    "VEN": "Veneto",
}

with open(os.path.join(os.path.dirname(__file__), "schema.sql"), "r") as f:
    DB_SCHEMA = f.read()


def fold_with_none(func, a, b):
    if a is None:
        return b
    if b is None:
        return a
    return func((a, b))


def min_with_none(a: List[Optional[float]]):
    return reduce(partial(fold_with_none, min), a, None)


def max_with_none(a: List[Optional[float]]):
    return reduce(partial(fold_with_none, max), a, None)


def sum_with_none(a: List[Optional[float]]):
    return reduce(partial(fold_with_none, sum), a, None)


class Storage:
    def __init__(self, storage_dir: str):
        self.storage_dir = storage_dir
        os.makedirs(self.storage_dir)

        self.conn = sqlite3.connect(
            self.storage_dir + "/db.sqlite3",
            check_same_thread=False,
            isolation_level=None,
            detect_types=sqlite3.PARSE_DECLTYPES,
        )
        self.cursor = self.conn.cursor()
        self.cursor.executescript(DB_SCHEMA)

        self.users: Dict[User, User] = dict()
        self.contests: Dict[int, Contest] = dict()
        self.tasks: Dict[int, Dict[str, Task]] = defaultdict(dict)
        self.participations: List[Participation] = list()
        self.task_scores: Dict[int, Dict[str, List[TaskScore]]] = defaultdict(
            lambda: defaultdict(list)
        )

    def path(self, path: str):
        return os.path.join(self.storage_dir, path)

    def finish(self):
        self.finish_contests()

    def write(self, path: str, data):
        with open(self.path(path), "w") as f:
            f.write(json.dumps(data, indent=2))

    def finish_contests(self):
        contests = [c.to_json(self) for c in self.contests.values()]
        contests.sort(key=lambda c: -c["year"])
        self.write("contests.json", {"contests": contests})

        os.makedirs(self.path("contests"))
        for year, contest in self.contests.items():
            self.write(f"contests/{year}.json", contest.to_json(self))


class User:
    def __init__(
        self,
        storage: Storage,
        name: str,
        surname: str,
        birth: Optional[str],
        gender: str,
        **kwargs,
    ):
        self.storage = storage
        self.name = name
        self.surname = surname
        self.birth = None  # type: Optional[datetime.date]
        if birth is not None:
            if isinstance(birth, datetime.datetime):
                self.birth = birth.date()
            elif isinstance(birth, str):
                day, month, year = map(int, birth.split("/"))
                self.birth = datetime.date(year, month, day)
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
        return hashlib.md5(
            ("%s:%s:%s" % (self.name, self.surname, self.birth)).encode()
        ).hexdigest()

    def __hash__(self):
        return hash(self.name) ^ hash(self.surname)

    def __repr__(self):
        return "<User %s %s -- %s id=%s>" % (
            self.name,
            self.surname,
            str(self.birth),
            self.id(),
        )


class Contest:
    def __init__(
        self,
        storage: Storage,
        year: int,
        location: Optional[str],
        region: Optional[str],
        gmaps: Optional[str],
        latitude: Optional[float],
        longitude: Optional[float],
    ):
        self.storage = storage
        self.year = year
        self.location = location
        self.region = region
        self.gmaps = gmaps
        self.latitude = latitude
        self.longitude = longitude

    def id(self) -> str:
        return str(self.year)

    def __repr__(self):
        return "<Contest year=%s>" % self.year

    @cache
    def max_score_possible(self, storage: Storage) -> float:
        return sum_with_none(
            t.max_score_possible for t in storage.tasks[self.year].values()
        )

    @cache
    def max_score(self, storage: Storage) -> float:
        return sum_with_none(
            t.max_score(storage) for t in storage.tasks[self.year].values()
        )

    @cache
    def avg_score(self, storage: Storage) -> float:
        return sum_with_none(
            t.avg_score(storage) for t in storage.tasks[self.year].values()
        )

    @cache
    def to_json(self, storage: Storage):
        num_contestants = sum(1 for p in storage.participations if p.contest == self)

        return {
            "year": self.year,
            "location": {
                "location": self.location,
                "gmaps": self.gmaps,
                "latitude": self.latitude,
                "longitude": self.longitude,
            },
            "region": self.region,
            "num_contestants": num_contestants,
            "max_score_possible": self.max_score_possible(storage),
            "max_score": self.max_score(storage),
            "avg_score": self.avg_score(storage),
            "tasks": [
                self.task_to_json(t, storage) for t in storage.tasks[self.year].values()
            ],
            "medals": {
                medal: self.medal_to_json(medal, storage)
                for medal in ["gold", "silver", "bronze"]
            },
        }

    def task_to_json(self, task: "Task", storage: Storage):
        return {
            "contest_year": self.year,
            "name": task.name,
            "title": task.title,
            "link": task.link,
            "index": task.index,
            "max_score_possible": task.max_score_possible,
        }

    def medal_to_json(self, medal: str, storage: Storage):
        medal_code = medal[0].upper()
        count = sum(
            1
            for p in storage.participations
            if p.contest == self and p.medal == medal_code
        )
        cutoff = min_with_none(
            p.score
            for p in storage.participations
            if p.contest == self and p.medal == medal_code
        )
        return {
            "count": count or None,  # assume the number of medals is positive
            "cutoff": cutoff,
        }


class Task:
    def __init__(
        self,
        storage: Storage,
        name: str,
        contest: Contest,
        index: int,
        max_score_possible: float,
        title: str,
        link: Optional[str],
    ):
        self.storage = storage
        self.name = name
        self.contest = contest
        self.index = index
        self.max_score_possible = max_score_possible
        self.title = title
        self.link = link

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.name)

    def __repr__(self):
        return "<Task name=%s contest=%s index=%d>" % (
            self.name,
            self.contest,
            self.index,
        )

    @cache
    def max_score(self, storage: Storage):
        return max_with_none(
            s.score for s in storage.task_scores[self.contest.year][self.name]
        )

    @cache
    def avg_score(self, storage: Storage):
        scores = [s.score for s in storage.task_scores[self.contest.year][self.name]]
        if not scores:
            return None
        if any(s is None for s in scores):
            return None
        return sum(scores) / len(scores)


class Participation:
    def __init__(
        self,
        storage: Storage,
        user: User,
        contest: Contest,
        rank: Optional[int],
        school: Optional[str],
        venue: Optional[str],
        medal: Optional[str],
        IOI: Optional[bool],
        score: Optional[float],
        **kwargs,
    ):
        self.storage = storage
        self.user = user
        self.contest = contest
        self.rank = rank
        self.school = school
        self.venue = venue
        self.medal = medal
        self.IOI = IOI
        self.score = score
        if self.score is not None:
            self.score = float(self.score)

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.user.id())

    def __repr__(self):
        return "<Participation user=%s contest=%s>" % (self.user, self.contest)


class TaskScore:
    def __init__(
        self,
        storage: Storage,
        task: Task,
        participation: Participation,
        score: Optional[float],
    ):
        self.storage = storage
        self.task = task
        self.participation = participation
        self.score = score
        assert task.contest == participation.contest

    def id(self) -> str:
        return "%s-%s" % (self.task.id(), self.participation.user.id())

    def __repr__(self):
        return "<TaskScore task=%s participation=%s score=%s>" % (
            self.task,
            self.participation,
            self.score,
        )

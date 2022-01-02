from collections import defaultdict
import datetime
import hashlib
import os
import json
from functools import cache, cached_property, reduce, partial
from typing import Dict, List, Optional

# TODO:
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

MEDAL_NAMES = {
    "G": "gold",
    "S": "silver",
    "B": "bronze",
}


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

        self.users: Dict[User, User] = dict()
        self.contests: Dict[int, Contest] = dict()
        self.tasks: Dict[int, Dict[str, Task]] = defaultdict(dict)
        self.participations: Dict[int, List[Participation]] = defaultdict(list)
        self.task_scores: Dict[int, Dict[str, List[TaskScore]]] = defaultdict(
            lambda: defaultdict(list)
        )

    def path(self, path: str):
        return os.path.join(self.storage_dir, path)

    def finish(self):
        self.finish_contests()

    def write(self, path: str, data):
        dest = self.path(path)
        dirname = os.path.dirname(dest)
        os.makedirs(dirname, exist_ok=True)
        with open(self.path(path), "w") as f:
            f.write(json.dumps(data, indent=2))

    def finish_contests(self):
        contests = [c.to_json() for c in self.contests.values()]
        contests.sort(key=lambda c: -c["year"])
        self.write("contests.json", {"contests": contests})

        for year, contest in self.contests.items():
            self.write(f"contests/{year}.json", contest.to_json())
            self.write(f"contests/{year}/results.json", contest.results_to_json())


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
        # automatically added when a Participation is constructed
        self.participations = []

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

    @property
    def tasks(self):
        return self.storage.tasks[self.year]

    @property
    def participations(self):
        return self.storage.participations[self.year]

    @cached_property
    def max_score_possible(self) -> float:
        return sum_with_none(t.max_score_possible for t in self.tasks.values())

    @cached_property
    def max_score(self) -> float:
        return sum_with_none(t.max_score for t in self.tasks.values())

    @cached_property
    def avg_score(self) -> float:
        return sum_with_none(t.avg_score for t in self.tasks.values())

    @property
    def navigation(self):
        get_year = lambda y: y if y in self.storage.contests else None
        return {
            "current": self.year,
            "previous": get_year(self.year - 1),
            "next": get_year(self.year + 1),
        }

    @cache
    def to_json(self):
        return {
            "year": self.year,
            "navigation": self.navigation,
            "location": {
                "location": self.location,
                "gmaps": self.gmaps,
                "latitude": self.latitude,
                "longitude": self.longitude,
            },
            "region": self.region,
            "num_contestants": len(self.participations),
            "max_score_possible": self.max_score_possible,
            "max_score": self.max_score,
            "avg_score": self.avg_score,
            "tasks": [self.task_to_json(t) for t in self.tasks.values()],
            "medals": {
                medal: self.medal_to_json(medal)
                for medal in ["gold", "silver", "bronze"]
            },
        }

    def task_to_json(self, task: "Task"):
        return {
            "contest_year": self.year,
            "name": task.name,
            "title": task.title,
            "link": task.link,
            "index": task.index,
            "max_score_possible": task.max_score_possible,
        }

    def medal_to_json(self, medal: str):
        medal_code = medal[0].upper()
        count = sum(1 for p in self.participations if p.medal == medal_code)
        cutoff = min_with_none(
            p.score for p in self.participations if p.medal == medal_code
        )
        return {
            "count": count or None,  # assume the number of medals is positive
            "cutoff": cutoff,
        }

    def results_to_json(self):
        participations = sorted(self.participations, key=lambda p: p.rank)
        return {
            "navigation": self.navigation,
            "tasks": list(self.tasks.keys()),
            "results": [p.to_json() for p in participations],
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

    @property
    def scores(self):
        return self.storage.task_scores[self.contest.year][self.name]

    @cached_property
    def max_score(self):
        return max_with_none(s.score for s in self.scores)

    @cached_property
    def avg_score(self):
        if not self.scores:
            return None
        scores = [s.score for s in self.scores]
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
        if rank:
            self.rank = int(rank)
        else:
            self.rank = None
        self.school = school
        self.venue = venue
        self.medal = MEDAL_NAMES[medal] if medal else None
        self.IOI = IOI
        self.score = score
        if self.score is not None:
            self.score = float(self.score)
        user.participations.append(self)
        # automatically added on TaskScore construction
        self.scores = []

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.user.id())

    def __repr__(self):
        return "<Participation user=%s contest=%s>" % (self.user, self.contest)

    def to_json(self):
        past_participations = [
            {"year": p.contest.year, "medal": p.medal}
            for p in self.user.participations
            if p.contest.year < self.contest.year
        ]
        scores = [s.score for s in self.scores]
        return {
            "rank": self.rank,
            "contestant": {
                "id": self.user.id(),
                "first_name": self.user.name,
                "last_name": self.user.surname,
            },
            "ioi": self.IOI or False,
            "region": self.venue[:3] if self.venue else None,
            "score": self.score,
            "scores": scores,
            "medal": self.medal,
            "past_participations": sorted(
                past_participations, key=lambda p: -p["year"]
            ),
        }


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
        participation.scores.append(self)

    def id(self) -> str:
        return "%s-%s" % (self.task.id(), self.participation.user.id())

    def __repr__(self):
        return "<TaskScore task=%s participation=%s score=%s>" % (
            self.task,
            self.participation,
            self.score,
        )

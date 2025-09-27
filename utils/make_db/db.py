import datetime
import hashlib
import json
import os
from collections import defaultdict
from functools import cache, cached_property, reduce, partial
from typing import Dict, List, Optional

from homepage import homepage
from sqlite import finish_sqlite

MEDAL_NAMES = {
    "G": "gold",
    "S": "silver",
    "B": "bronze",
}


def cast_or_none(func, a):
    if a is None:
        return None
    return func(a)


def venue_to_region(venue: str):
    if not venue:
        return None
    return venue[:3]


def fold_with_none(func, a, b):
    if a is None:
        return b
    if b is None:
        return a
    return func((a, b))


def max_with_none(a: List[Optional[float]]):
    return reduce(partial(fold_with_none, max), a, None)


def sum_with_none(a: List[Optional[float]]):
    return reduce(partial(fold_with_none, sum), a, None)


class Storage:
    def __init__(self, storage_dir: str):
        self.storage_dir = storage_dir
        os.makedirs(self.storage_dir)

        self.regions: List[Region] = list()
        self.users: Dict[User, User] = dict()
        self.contests: Dict[int, Contest] = dict()
        self.tasks: Dict[int, Dict[str, Task]] = defaultdict(dict)
        self.participations: Dict[int, List[Participation]] = defaultdict(list)
        self.task_scores: Dict[int, Dict[str, List[TaskScore]]] = defaultdict(
            lambda: defaultdict(list)
        )
        self.internationals: Dict[str, International] = dict()

    def path(self, path: str):
        return os.path.join(self.storage_dir, path)

    def finish(self):
        self.write("home.json", homepage(self))
        finish_sqlite(self)

    def write(self, path: str, data):
        dest = self.path(path)
        dirname = os.path.dirname(dest)
        os.makedirs(dirname, exist_ok=True)
        with open(self.path(path), "w") as f:
            f.write(json.dumps(data))


class International:
    def __init__(
        self,
        storage: Storage,
        code: str,
        name: str,
        link: Optional[str],
        color: str,
    ):
        self.storage = storage
        self.code = code
        self.name = name
        self.link = link
        self.color = color

    def __repr__(self) -> str:
        return f"<International {self.code} {self.name}>"


class User:
    def __init__(
        self,
        storage: Storage,
        name: str,
        surname: str,
        birth: Optional[str],
        gender: str,
        username: Optional[str],
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
        self.username = username
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

    @cached_property
    def num_medals(self):
        medals = {"gold": 0, "silver": 0, "bronze": 0}
        for participation in self.participations:
            if participation.medal is not None:
                medals[participation.medal] += 1
        return medals

    @cached_property
    def win_at_first_participation(self):
        first = min(self.participations, key=lambda p: p.contest.year)
        return first.rank == 1


class Contest:
    def __init__(
        self,
        storage: Storage,
        year: int,
        location: Optional[str],
        region: Optional[str],
        gmaps: Optional[str],
        latitude: Optional[str],
        longitude: Optional[str],
    ):
        self.storage = storage
        self.year = cast_or_none(int, year)
        self.location = location
        self.region = region
        self.gmaps = gmaps
        self.latitude = cast_or_none(float, latitude)
        self.longitude = cast_or_none(float, longitude)

    @property
    def tasks(self):
        return self.storage.tasks[self.year]

    @property
    def participations(self):
        return self.storage.participations[self.year]

    @cached_property
    def max_score(self) -> float:
        return sum_with_none(t.max_score for t in self.tasks.values())

    @cached_property
    def num_ex_aequo(self):
        max_score = self.max_score
        if max_score is None:
            return None
        return sum(1 for p in self.participations if p.score == max_score)

    @cached_property
    def num_girls(self):
        return sum(1 for p in self.participations if p.user.gender == "F")

    @cached_property
    def num_boys(self):
        return sum(1 for p in self.participations if p.user.gender == "M")


class Task:
    def __init__(
        self,
        storage: Storage,
        name: str,
        contest: Contest,
        index: str,
        max_score_possible: float,
        title: str,
        link: Optional[str],
    ):
        self.storage = storage
        self.name = name
        self.contest = contest
        self.index = cast_or_none(int, index)
        self.max_score_possible = cast_or_none(float, max_score_possible)
        self.title = title
        self.link = link

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

    @cached_property
    def num_zeros(self):
        if self.max_score_possible is None:
            return None
        return sum(1 for s in self.scores if s.score == 0)

    @cached_property
    def num_full_scores(self):
        if self.max_score_possible is None:
            return None
        return sum(1 for s in self.scores if s.score == self.max_score_possible)


class Participation:
    def __init__(
        self,
        storage: Storage,
        user: User,
        contest: Contest,
        rank: Optional[str],
        school: Optional[str],
        venue: Optional[str],
        medal: Optional[str],
        internationals: Optional[str],
        score: Optional[str],
        **kwargs,
    ):
        self.storage = storage
        self.user = user
        self.contest = contest
        self.rank = cast_or_none(int, rank)
        self.school = school
        self.venue = venue
        self.medal = MEDAL_NAMES[medal] if medal and medal != 'H' else None
        if internationals:
            self.internationals = [
                self.storage.internationals[name] for name in internationals.split(",")
            ]
        else:
            self.internationals = []
        self.score = cast_or_none(float, score)
        user.participations.append(self)
        # automatically added on TaskScore construction
        self.scores = []

    @property
    def region(self):
        return venue_to_region(self.venue)


class TaskScore:
    def __init__(
        self,
        storage: Storage,
        task: Task,
        participation: Participation,
        score: Optional[str],
    ):
        self.storage = storage
        self.task = task
        self.participation = participation
        self.score = cast_or_none(float, score)
        assert task.contest == participation.contest
        participation.scores.append(self)


class Region:
    def __init__(self, storage: Storage, id: str, name: str):
        self.storage = storage
        self.id = id
        self.name = name

    @cached_property
    def participations(self):
        participations = []
        for contest in self.storage.participations.values():
            participations.extend(
                [p for p in contest if venue_to_region(p.venue) == self.id]
            )
        return participations

    @cached_property
    def num_contestants(self):
        return len(self.participations)

    @cached_property
    def num_medals(self):
        medals = {"gold": 0, "silver": 0, "bronze": 0}
        for p in self.participations:
            if p.medal:
                medals[p.medal] += 1
        return medals

    @cached_property
    def num_first_places(self):
        return sum(1 for p in self.participations if p.rank == 1)

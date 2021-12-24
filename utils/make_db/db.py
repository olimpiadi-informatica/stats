from typing import Optional
import sqlite3
import hashlib
import datetime

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
    def __init__(
        self,
        name: str,
        surname: str,
        birth: Optional[str],
        gender: str,
        **kwargs,
    ):
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

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = (
            "INSERT INTO users (id, name, surname, birth, gender) VALUES "
            "(:id, :name, :surname, :birth, :gender)"
        )
        query_fts = (
            "INSERT INTO users_fts4 (id, name, surname) VALUES "
            "(:id, :name, :surname)"
        )
        try:
            cursor.execute(
                query,
                {
                    "id": self.id(),
                    "name": self.name,
                    "surname": self.surname,
                    "birth": self.birth,
                    "gender": self.gender,
                },
            )
            cursor.execute(
                query_fts, {"id": self.id(), "name": self.name, "surname": self.surname}
            )
        except Exception as e:
            print("Failed to insert user", self)
            print(e)

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
        year: int,
        location: Optional[str],
        region: Optional[str],
        gmaps: Optional[str],
        latitude: Optional[float],
        longitude: Optional[float],
    ):
        self.year = year
        self.location = location
        self.region = region
        self.gmaps = gmaps
        self.latitude = latitude
        self.longitude = longitude

    def id(self) -> str:
        return str(self.year)

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = (
            "INSERT INTO contests (year, location, region, gmaps, latitude, longitude) VALUES "
            "(:year, :location, :region, :gmaps, :latitude, :longitude)"
        )
        query_fts = (
            "INSERT INTO contests_fts4 (year, location, region, full_region) VALUES "
            "(:year, :location, :region, :full_region)"
        )
        try:
            cursor.execute(
                query,
                {
                    "year": self.year,
                    "location": self.location,
                    "region": self.region,
                    "gmaps": self.gmaps,
                    "latitude": self.latitude,
                    "longitude": self.longitude,
                },
            )
            cursor.execute(
                query_fts,
                {
                    "year": self.year,
                    "location": self.location,
                    "region": self.region,
                    "full_region": REGION_NAMES.get(self.region, None),
                },
            )
        except Exception as e:
            print("Failed to insert contest", self)
            print(e)

    def __repr__(self):
        return "<Contest year=%s>" % self.year


class Task:
    def __init__(
        self,
        name: str,
        contest: Contest,
        index: int,
        max_score: float,
        title: str,
        link: Optional[str],
    ):
        self.name = name
        self.contest = contest
        self.index = index
        self.max_score = max_score
        self.title = title
        self.link = link

    def id(self) -> str:
        return "%s-%s" % (self.contest.id(), self.name)

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = (
            'INSERT INTO tasks (name, contest_year, "index", max_score, title, link) VALUES '
            "(:name, :contest_year, :index, :max_score, :title, :link)"
        )
        query_fts = (
            "INSERT INTO tasks_fts4 (contest_year, name, title, link) VALUES "
            "(:name, :contest_year, :title, :link)"
        )
        try:
            cursor.execute(
                query,
                {
                    "name": self.name,
                    "contest_year": self.contest.year,
                    "index": self.index,
                    "max_score": self.max_score,
                    "title": self.title,
                    "link": self.link,
                },
            )
            cursor.execute(
                query_fts,
                {
                    "name": self.name,
                    "contest_year": self.contest.year,
                    "title": self.title,
                    "link": self.link,
                },
            )
        except Exception as e:
            print("Failed to insert task", self)
            print(e)

    def __repr__(self):
        return "<Task name=%s contest=%s index=%d>" % (
            self.name,
            self.contest,
            self.index,
        )


class Participation:
    def __init__(
        self,
        user: User,
        contest: Contest,
        position: Optional[int],
        school: Optional[str],
        venue: Optional[str],
        medal: Optional[str],
        IOI: Optional[bool],
        score: Optional[float],
        **kwargs,
    ):
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
        query = (
            "INSERT INTO participations (user_id, contest_year, position, school, venue, region, medal, IOI, "
            "score) "
            "VALUES (:user_id, :contest_year, :position, :school, :venue, :region, :medal, :IOI, :score)"
        )
        try:
            region = self.venue[:3] if self.venue else None
            cursor.execute(
                query,
                {
                    "user_id": self.user.id(),
                    "contest_year": self.contest.year,
                    "position": self.position,
                    "school": self.school,
                    "venue": self.venue,
                    "region": region,
                    "medal": self.medal,
                    "IOI": self.IOI,
                    "score": self.score,
                },
            )
        except Exception as e:
            print("Failed to insert participation", self)
            print(e)

    def __repr__(self):
        return "<Participation user=%s contest=%s>" % (self.user, self.contest)


class TaskScore:
    def __init__(
        self, task: Task, participation: Participation, score: Optional[float]
    ):
        self.task = task
        self.participation = participation
        self.score = score
        assert task.contest == participation.contest

    def id(self) -> str:
        return "%s-%s" % (self.task.id(), self.participation.user.id())

    def add_to_db(self, cursor: sqlite3.Cursor):
        query = (
            "INSERT INTO task_scores (task_name, contest_year, user_id, score) VALUES "
            "(:task_name, :contest_year, :user_id, :score)"
        )
        try:
            cursor.execute(
                query,
                {
                    "task_name": self.task.name,
                    "contest_year": self.task.contest.year,
                    "user_id": self.participation.user.id(),
                    "score": self.score,
                },
            )
        except Exception as e:
            print("Failed to insert task_score", self)
            print(e)

    def __repr__(self):
        return "<TaskScore task=%s participation=%s score=%s>" % (
            self.task,
            self.participation,
            self.score,
        )


def create_schema(cursor: sqlite3.Cursor):
    cursor.executescript(DB_SCHEMA)

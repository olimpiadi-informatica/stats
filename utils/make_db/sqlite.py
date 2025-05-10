from sqlite3 import connect, Connection
import os
import typing

if typing.TYPE_CHECKING:
    from db import Storage


def finish_sqlite(storage: "Storage"):
    con = connect(os.path.join(storage.storage_dir, "storage.db"))

    con.execute(
        """
        CREATE TABLE regions (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        )
        """
    )
    con.execute(
        """
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT,
            surname TEXT NOT NULL,
            username TEXT
        )
        """
    )
    con.execute(
        """
        CREATE TABLE contests (
            year INTEGER PRIMARY KEY,
            location TEXT,
            region TEXT,
            gmaps TEXT,
            latitude REAL,
            longitude REAL
        )
        """
    )
    con.execute(
        """
        CREATE TABLE tasks (
            name TEXT PRIMARY KEY,
            contest_year INTEGER NOT NULL,
            idx INTEGER,
            max_score_possible REAL,
            title TEXT,
            link TEXT,
            FOREIGN KEY(contest_year) REFERENCES contests(year)
        )
        """
    )
    con.execute(
        """
        CREATE TABLE participations (
            user_id TEXT NOT NULL,
            contest_year INTEGER NOT NULL,
            rank INTEGER,
            school TEXT,
            region_id TEXT,
            medal TEXT,
            internationals TEXT,
            score REAL,
            PRIMARY KEY(user_id, contest_year),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(contest_year) REFERENCES contests(year),
            FOREIGN KEY(region_id) REFERENCES regions(id)
        )
        """
    )
    con.execute(
        """
        CREATE TABLE task_scores (
            task_name TEXT NOT NULL,
            user_id TEXT NOT NULL,
            contest_year INTEGER NOT NULL,
            score REAL,
            PRIMARY KEY(task_name, user_id, contest_year),
            FOREIGN KEY(task_name) REFERENCES tasks(name),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(contest_year) REFERENCES contests(year)
        )
        """
    )
    con.execute(
        """
        CREATE TABLE internationals (
            code TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            link TEXT,
            color TEXT
        )
        """
    )

    finish_contests(storage, con)
    finish_regions(storage, con)
    finish_tasks(storage, con)
    finish_users(storage, con)
    finish_internationals(storage, con)

    con.commit()


def finish_contests(storage: "Storage", con: Connection):
    for contest in storage.contests.values():
        con.execute(
            """
            INSERT INTO contests (year, location, region, gmaps, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                contest.year,
                contest.location,
                contest.region,
                contest.gmaps,
                contest.latitude,
                contest.longitude,
            ),
        )


def finish_regions(storage: "Storage", con: Connection):
    for region in storage.regions:
        con.execute(
            """
            INSERT INTO regions (id, name)
            VALUES (?, ?)
            """,
            (region.id, region.name),
        )


def finish_tasks(storage: "Storage", con: Connection):
    for year, year_tasks in storage.tasks.items():
        for task in year_tasks.values():
            con.execute(
                """
                INSERT INTO tasks (
                    name, contest_year, idx, max_score_possible, title, link
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    task.name,
                    task.contest.year,
                    task.index,
                    task.max_score_possible,
                    task.title,
                    task.link,
                ),
            )


def finish_users(storage: "Storage", con: Connection):
    for user in storage.users.values():
        con.execute(
            """
            INSERT INTO users (id, name, surname, username)
            VALUES (?, ?, ?, ?)
            """,
            (
                user.id(),
                user.name,
                user.surname,
                user.username,
            ),
        )

        for p in user.participations:
            con.execute(
                """
                INSERT INTO participations (
                    user_id, contest_year, rank, school,
                    region_id, medal, internationals, score
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user.id(),
                    p.contest.year,
                    p.rank,
                    p.school,
                    p.region,
                    p.medal,
                    (
                        ",".join(i.code for i in p.internationals)
                        if p.internationals
                        else None
                    ),
                    p.score,
                ),
            )

            for score in p.scores:
                con.execute(
                    """
                    INSERT INTO task_scores (task_name, user_id, contest_year, score)
                    VALUES (?, ?, ?, ?)
                    """,
                    (score.task.name, user.id(), p.contest.year, score.score),
                )


def finish_internationals(storage: "Storage", con: Connection):
    for international in storage.internationals.values():
        con.execute(
            """
            INSERT INTO internationals (code, name, link, color)
            VALUES (?, ?, ?, ?)
            """,
            (
                international.code,
                international.name,
                international.link,
                international.color,
            ),
        )

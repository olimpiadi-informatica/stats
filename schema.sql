CREATE TABLE regions (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        );
CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT,
            surname TEXT NOT NULL,
            username TEXT
        );
CREATE TABLE contests (
            year INTEGER PRIMARY KEY,
            location TEXT,
            region TEXT,
            gmaps TEXT,
            latitude REAL,
            longitude REAL
        );
CREATE TABLE tasks (
            name TEXT PRIMARY KEY,
            contest_year INTEGER NOT NULL,
            idx INTEGER,
            max_score_possible REAL,
            title TEXT,
            link TEXT,
            FOREIGN KEY(contest_year) REFERENCES contests(year)
        );
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
        );
CREATE TABLE task_scores (
            task_name TEXT NOT NULL,
            user_id TEXT NOT NULL,
            contest_year INTEGER NOT NULL,
            score REAL,
            PRIMARY KEY(task_name, user_id, contest_year),
            FOREIGN KEY(task_name) REFERENCES tasks(name),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(contest_year) REFERENCES contests(year)
        );
CREATE TABLE internationals (
            code TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            link TEXT,
            color TEXT
        );

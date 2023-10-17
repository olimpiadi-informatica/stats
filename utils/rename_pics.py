#!/usr/bin/env python3
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

# Rename the photos of the faces from <surname>.jpg to <id>.jpg

import argparse
import glob
import json
import os.path
from pathlib import Path
import shutil
import sys
import re

invalid_chars = re.compile("[^a-z]")

def main(args):
    data_path = Path(args.data) / "contests" / args.year / "results.json"
    with open(data_path) as f:
        data = json.load(f)

    contestants = [r["contestant"] for r in data["results"]]

    for contestant in contestants:
        surname: str = contestant["last_name"].lower()
        for a, b in [("à", "a"), ("á", "a"), ("è", "e"), ("é", "e"), ("ì", "i"), ("í", "i"), ("ò", "o"), ("ó", "o"), ("ù", "u"), ("ú", "u"), ("ü", "u")]:
            surname = surname.replace(a, b)
        contestant["username"] = invalid_chars.sub("", surname)

    contestant_map = {}
    to_disambiguate = set()
    for contestant in contestants:
        username = contestant["username"]
        # First time this username
        if username not in contestant_map and username not in to_disambiguate:
            contestant_map[username] = contestant
        # Username already present, start disambiguating
        elif username in contestant_map and username not in to_disambiguate:
            to_disambiguate.add(username)
            other = contestant_map.pop(username)
            # other["username"] += other["first_name"].lower()[0] # Assuming no duplicate in the first letter!
            other["username"] += other["first_name"].lower()
            contestant_map[other["username"]] = other

            # username = username + contestant["first_name"].lower()[0]
            username = username + contestant["first_name"].lower()
            contestant["username"] = username
            contestant_map[username] = contestant
        # Username already found, again
        elif username not in contestant_map and username in to_disambiguate:
            # username = username + contestant["first_name"].lower()[0]
            username = username + contestant["first_name"].lower()
            contestant["username"] = username
            contestant_map[username] = contestant

    for in_path in glob.glob(args.input + "/*.jpg"):
        username, _ = os.path.splitext(os.path.basename(in_path))
        if username not in contestant_map:
            print(f"{username} not found")
            continue
        contestant = contestant_map[username]
        id = contestant["id"]
        dest = Path(args.output) / f"{id}.jpg"
        shutil.copy2(in_path, dest)
        # for
    #     cursor.execute("SELECT id FROM users JOIN participations ON users.id = participations.user_id AND contest_year = ? AND REPLACE(surname, ' ', '') = ? COLLATE NOCASE", (args.year, username))
    #     res = cursor.fetchall()
    #     if not res:
    #         print("%s not found" % username, file=sys.stderr)
    #     elif len(res) > 1:
    #         print("%s found more than once: %s" % (username, res), file=sys.stderr)
    #     else:
    #         dest = os.path.join(args.output, "%s.jpg" % res[0][0])
    #         shutil.copy2(in_path, dest)


if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument("data", help="Path to the data folder")
    args.add_argument("input", help="Directory with the input files")
    args.add_argument("output", help="Diectory with the output files")
    args.add_argument("year", help="Year of the contest")
    main(args.parse_args())

#!/usr/bin/env python3
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

# Rename the photos of the faces from <surname>.jpg to <id>.jpg
import os.path
import glob
import sys
from collections import OrderedDict
import shutil

import argparse
import sqlite3

def main(args):
    database = sqlite3.connect(args.db,
                               check_same_thread=False,
                               isolation_level=None,
                               detect_types=sqlite3.PARSE_DECLTYPES)
    cursor = database.cursor()
    for in_path in glob.glob(args.input + "/*.jpg"):
        username, _ = os.path.splitext(os.path.basename(in_path))
        cursor.execute("SELECT id FROM users JOIN participations ON users.id = participations.user_id AND contest_year = ? AND REPLACE(surname, ' ', '') = ? COLLATE NOCASE", (args.year, username))
        res = cursor.fetchall()
        if not res:
            print("%s not found" % username, file=sys.stderr)
        elif len(res) > 1:
            print("%s found more than once: %s" % (username, res), file=sys.stderr)
        else:
            dest = os.path.join(args.output, "%s.jpg" % res[0][0])
            shutil.copy2(in_path, dest)

    database.close()


if __name__ == '__main__':
    args = argparse.ArgumentParser()
    args.add_argument("db", help="SQLite3 file for the db")
    args.add_argument("input", help="Directory with the input files")
    args.add_argument("output", help="Diectory with the output files")
    args.add_argument("year", help="Year of the contest")
    main(args.parse_args())

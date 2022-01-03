# [stats.olinfo.it](https://stats.olinfo.it)

This is the portal with the statistics of the Italian Olympiads of Informatics!

## How it works

The rankings of all the years are stored in a Google Spreadsheet (yeah, _excel-as-a-database!_).
Inside `utils/make_db` there is a script that fetches this spreadsheet and build the actual data store, which is a collection of JSON files.
You can find the data at [`./data`](https://github.com/algorithm-ninja/oii-stats/tree/master/data).

The frontend is written with Next.js and at build time it reads all the JSON files and produces a statically generated site (SSG). The result of the export is then put inside a Docker container with nginx for serving it, and then deployed on Kubernetes.

## How to work on the frontend

1. Clone this repository

```
$ git clone https://github.com/algorithm-ninja/oii-stats.git
```

2. Enter the `frontend/` directory

```
$ cd frontend
```

3. Start the dev Next.js server

```
$ yarn dev
```

4. Any changes should trigger an automatic page reload thanks to Next.js

## How to update the `data/` directory

> The `data/` directory should never be updated by hand, any change will be overwritten by the scripts.

1. Get the ID of the Google Spreadsheet with the rankings. In the OII folder the file name starts with `Classifiche delle nazionali`. You can find the ID from the file URL: `https://docs.google.com/spreadsheets/d/$SPREADSHEET_ID/edit`

2. Enter the `utils/make_db` directory

3. You need an app credentials file that allows the script to interact with the Google Docs APIs. Create such an app following [the official docs](https://developers.google.com/sheets/api/quickstart/python). From this step you should obtain a `credentials.json`.

4. Generate the new database by running

```
$ ./run $SPREADSHEET_ID ../../data --drop
```

> If it's the first time you follow this guide you may need the `token.pickle` file. To obtain it add `--request-credentials` to the command above.

## Rebuilding the docker image locally

After each push to `master` the CI will build the docker image.
The image is published at `ghcr.io/algorithm-ninja/oii-stats-frontend:$tag` where `$tag` is the [version of the application](https://github.com/algorithm-ninja/oii-stats/pkgs/container/oii-stats-frontend).

If you want to build the image locally you can use the following helper script:

```
$ ./utils/docker_build.sh
```

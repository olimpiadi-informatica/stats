# [stats.olinfo.it](https://stats.olinfo.it)

This is the portal with the statistics of the Italian Olympiads of Informatics!

## How it works

The rankings of all the years are stored in a Google Spreadsheet (yeah, _excel-as-a-database!_).
Inside `utils/make_db` there is a script that fetches this spreadsheet and build the actual data store, which is a collection of JSON files.
You can find the data at [`./data`](https://github.com/algorithm-ninja/oii-stats/tree/master/data).

The frontend is written with Next.js and at build time it reads all the JSON files and produces a statically generated site (SSG). The result of the export is then put inside a Docker container with nginx for serving it, and then deployed on Kubernetes.

## How to work on the frontend

1. Clone this repository

```bash
$ git clone https://github.com/algorithm-ninja/oii-stats.git
```

2. Enter the `frontend/` directory

```bash
$ cd frontend
```

3. Start the dev Next.js server

```bash
$ yarn dev
```

4. Any changes should trigger an automatic page reload thanks to Next.js

## How to update the `data/` directory

> The `data/` directory should never be updated by hand, any change will be overwritten by the scripts.

1. Get the ID of the Google Spreadsheet with the rankings. In the OII folder the file name starts with `Classifiche delle nazionali`. You can find the ID from the file URL: `https://docs.google.com/spreadsheets/d/$SPREADSHEET_ID/edit`

2. Enter the `utils/make_db` directory

```bash
$ cd utils/make_db
```

3. Login to gcloud with

```bash
$ gcloud auth application-default login --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/spreadsheets
$ gcloud auth application-default set-quota-project A_GCP_PROJECT_ID
```

4. Create a virtual environment

```bash
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

5. Generate the new database by running

```bash
$ ./run.py $SPREADSHEET_ID ../../data --drop
```

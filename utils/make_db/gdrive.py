import os.path
import pickle
import itertools
import logging

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

logger = logging.getLogger("gdrive")

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


class Drive:
    def __init__(self, spreadsheet_id: str, request_cred=False, use_cache=True):
        creds = self.get_creds(request_cred)
        self.service = self.get_service(creds)
        self.spreadsheet_id = spreadsheet_id
        self.cache = {}
        self.use_cache = use_cache
        self.cache_file = f"cache-{spreadsheet_id}.pickle"
        if use_cache and os.path.exists(self.cache_file):
            with open(self.cache_file, "rb") as f:
                self.cache = pickle.load(f)

    @classmethod
    def get_creds(cls, request_cred):
        creds = None
        if os.path.exists("token.pickle"):
            with open("token.pickle", "rb") as token:
                logging.info("Using Google Drive token at token.pickle")
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                logger.info("Token is expired, refreshing")
                creds.refresh(Request())
            else:
                if not request_cred:
                    raise RuntimeError("Credentials at token.pickle not found")
                logger.warning(
                    "Token not found, requesting new token using credentials.json"
                )
                flow = InstalledAppFlow.from_client_secrets_file(
                    "credentials.json",
                    SCOPES,
                )
                creds = flow.run_local_server(port=0)
            with open("token.pickle", "wb") as token:
                pickle.dump(creds, token)
        return creds

    @classmethod
    def get_service(cls, creds):
        return build("sheets", "v4", credentials=creds).spreadsheets()

    def _get_table_cached(self, range):
        if self.use_cache and range in self.cache:
            logger.debug("Using cached table for %s", range)
            return self.cache[range]
        result = (
            self.service.values()
            .get(spreadsheetId=self.spreadsheet_id, range=range)
            .execute()
        )
        values = result.get("values", [])

        header = values[0]
        data = []
        for row in values[1:]:
            row = dict(list(itertools.zip_longest(header, row)))
            for k in row:
                if row[k] == "":
                    row[k] = None
            data.append(dict(row))
        if self.use_cache:
            self.cache[range] = data
            with open(self.cache_file, "wb") as f:
                pickle.dump(self.cache, f)
        return data

    def get_table(self, table, range=None):
        if range is None:
            range = "A1:ZZ10000"
        range = f"'{table}'!{range}"
        return self._get_table_cached(range)

    def list_sheets(self):
        metadata = self.service.get(spreadsheetId=self.spreadsheet_id).execute()
        sheets = metadata.get("sheets", "")
        names = []
        for sheet in sheets:
            names.append(sheet.get("properties", {}).get("title", ""))
        return names

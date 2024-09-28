import os.path
import pickle
import itertools
import logging
from typing import Any, Dict, Generic, List, TYPE_CHECKING, Optional, TypeVar, Tuple

from google import auth
from googleapiclient.discovery import build

if TYPE_CHECKING:
    from googleapiclient._apis.sheets.v4.resources import SheetsResource  # type: ignore

logger = logging.getLogger("gdrive")

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


class Drive:
    def __init__(self, spreadsheet_id: str, use_cache=True):
        self.service = self._get_google_sheets_api()
        self.spreadsheet_id = spreadsheet_id
        self.cache = {}
        self.use_cache = use_cache
        self.cache_file = f"cache-{spreadsheet_id}.pickle"
        if use_cache and os.path.exists(self.cache_file):
            with open(self.cache_file, "rb") as f:
                self.cache = pickle.load(f)

    @staticmethod
    def _get_google_sheets_api() -> "SheetsResource.SpreadsheetsResource":
        logging.debug("Getting Google Spreadsheets API instance")
        scopes = [
            "https://www.googleapis.com/auth/cloud-platform"
            "https://www.googleapis.com/auth/spreadsheets.readonly",
        ]
        credentials, _project_id = auth.default(scopes=scopes)
        return build(
            "sheets", "v4", credentials=credentials, cache_discovery=False
        ).spreadsheets()

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

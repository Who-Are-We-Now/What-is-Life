from __future__ import print_function

import os.path
import json
import shutil

import google.auth
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import re

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID and range of a sample spreadsheet.
SPREADSHEET_ID = '1VhsLpJhxCAdG90Zuxz3ArKu1u8KsLICI4koL2uAwRsk'
RANGE_NAME = 'Plot Data!A3:F'

HEADERS = ['chapter', 'fig_number',	'sequence',	'title', 'colors']

GDRIVE_IMAGES_PATH = '/Volumes/GoogleDrive/.shortcut-targets-by-id/1wD90KbjALP5oSHj80fcvD4GazlQ15Nyh/WAWN team share/Images/'
IMG_PATH = '../src/assets/images/'

def get_image(chapter, img_name):

    gdrive_path = GDRIVE_IMAGES_PATH + chapter + '/' + img_name
    chapter_path = IMG_PATH + chapter
    new_path = chapter_path + '/' + img_name
    # check whether chapter folder exists, if not make path
    if not os.path.exists(chapter_path):
        os.mkdir(chapter_path)
    # if image isn't there, copy it
    if not os.path.exists(new_path):
        shutil.copy2(gdrive_path, new_path)
        
    

def main():
    """Gets values from WAWN spreadsheet
    Makes figures.json file with format:
    {    
        shortnam-id : {
            files : [list of image names], 
            chapter : chapter value,
            caption : str,
            alt : str,
            credit : str, 
            type : str,
            status: str }
    }
    """
    creds, _ = google.auth.default()

    plots = {}

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                    range=RANGE_NAME).execute()
        values = result.get('values', [])

        if not values:
            print('No data found.')
            return

        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            print('%s, %s' % (row[0], row[2]))
            shortname = row[0]
            plots[shortname] = {}
            for i, entry in enumerate(row[1:]):
                print(i, entry)
                plots[shortname][HEADERS[i]] = entry

    except HttpError as err:
        print(err)

    with open('plots.json', 'w') as f:
        json.dump(plots, f)

    with open('../src/_data/plots.json', 'w') as f:
        json.dump(plots, f)

if __name__ == '__main__':
    main()
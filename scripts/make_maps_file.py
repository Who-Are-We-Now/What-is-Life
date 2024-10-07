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
import os

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID and range of a sample spreadsheet.
SPREADSHEET_ID = '1VhsLpJhxCAdG90Zuxz3ArKu1u8KsLICI4koL2uAwRsk'

# Range in spreadsheet being pulled
RANGE_NAME = 'Map Data!A2:F'

# Headers of each row being pulled from Figure Data
#   TODO: replace with automatic headers from spreadsheet
HEADERS = ['id', 'chapter', 'plot_number', 'caption', 'type', 'note']

# Directory of "WAWN_team_share/Images"
#   Uses gdrive desktop client to access shared images files
#   Note: You may need to change this path if it's located 
#         elsewhere in your filesystem
# GDRIVE_IMAGES_PATH = '/Users/johan/Library/CloudStorage/GoogleDrive-johanmichalove@gmail.com/.shortcut-targets-by-id/1wD90KbjALP5oSHj80fcvD4GazlQ15Nyh/WAWN_team_share/Images/'
if (os.getenv('WAWN_GDRIVE_PATH') is None):
    print("Set environment variable 'WAWN_GDRIVE_PATH to point to 'WAWN_team_share location")
    GDRIVE_IMAGES_PATH = '/Volumes/GoogleDrive/.shortcut-targets-by-id/1wD90KbjALP5oSHj80fcvD4GazlQ15Nyh/WAWN_team_share/Images/'
else:
    GDRIVE_IMAGES_PATH = os.getenv('WAWN_GDRIVE_PATH') + '/Images/'
    GDRIVE_MANU_PATH = os.getenv('WAWN_GDRIVE_PATH') + '/Manuscript.typesetting/'

# Root directory to where images should be copied
# Will add images to sub-folders corresponding to chapter-names stated
# in the google sheet.
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
        shutil.copy(gdrive_path, new_path)
        
def format_caption(chap, shortname, cap):
    return '__' + chap + '/' + shortname + '__' + '\n\n' \
        + cap.replace('<i>', '*').replace('</i>', '*') + '\n\n'
    

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

    maps = {}

    captions = []

    last_chap = ''

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
            if len(row) < 3:
                print("ERROR: id, chapter, and filename are missing for row: {}".format(row))
                continue
            print('%s \t %s \t\t\t-> %s' % (row[1], row[0], row[2]))
            shortname = row[0]
            maps[shortname] = {}
            # print("FILES", files)
            start_idx = 1
            for i, entry in enumerate(row[start_idx:]):
                maps[shortname][HEADERS[i+start_idx]] = entry
        

        print(maps)
    except HttpError as err:
        print(err)

    # Save to folder used for website
    with open('../src/_data/maps.json', 'w') as f:
        json.dump(maps, f, indent=4)

    # Save to current (scripts) folder
    with open('maps.json', 'w') as f:
        json.dump(maps, f, indent=4)

if __name__ == '__main__':
    main()
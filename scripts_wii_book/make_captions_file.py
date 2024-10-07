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
SPREADSHEET_ID = '1-Lz4M9xg2LiREjNS6dNYo77Fpw3rnNJtU-umaP4sFO0'

# Range in spreadsheet being pulled
RANGE_NAME = 'MITP art log!A2:Q'

# Headers of each row being pulled from Figure Data
#   TODO: replace with automatic headers from spreadsheet
HEADERS = [
    "Shortname",
    "Figure Number",
    "Color/Black and White (B&W default)",
    "File Format (drop-down menu)",
    "Caption (must also be in manuscript)",
    "Credit line, if separate from caption (must also be in manuscript)",
    "Alt text (do not insert in manuscript)",
    "Permissions Status (drop-down menu)",
    "Reprint Permissions Format (drop-down menu)",
    "Reprint Permissions Territory (drop-down menu)",
    "Reprint Permissions Language (drop-down menu)",
    "Reprint Permissions Edition (drop-down menu)",
    "Fair Use Analysis Conducted; Fair Use Applied",
    "Approved for publicity use?",
    "Size Restrictions or Requirements",
    "Permissions Comments, if any (any limitations, restrictions)",
    "Design and Layout Comments, if any (how art should appear)"
]

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

    figures = {}

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

        re_files = re.compile(r"(\[\[|\b)(\S.+?\.(webp|tif|tiff|svg|png|jpg|jpeg|heic|gif))\b")
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            if len(row) < 3:
                print("ERROR: id, chapter, and filename are missing for row: {}".format(row))
                continue
            print('%s \t %s \t\t\t-> %s' % (row[1], row[0], row[2]))
            shortname = row[0]
            figures[shortname] = {}
            # parse file names for file_print
            # files = []
            # for m in re_files.finditer(row[2]):
            #     files.append(m[2])
            # # print("FILES", files)
            # figures[shortname][HEADERS[2]] = files
            # # parse file names for file_web
            # files = []
            # for m in re_files.finditer(row[3]):
            #     files.append(m[2])
            # # print("FILES", files)
            # figures[shortname][HEADERS[3]] = files
            # files = []
            # for m in re_files.finditer(row[4]):
            #     files.append(m[2])
            # # print("FILES", files)
            # figures[shortname][HEADERS[4]] = files
            # # Add remaining columns
            # figures[shortname][HEADERS[1]] = row[1]
            start_idx = 1
            for i, entry in enumerate(row[start_idx:]):
                figures[shortname][HEADERS[i+start_idx]] = entry
                if HEADERS[i+start_idx] == 'indent' or HEADERS[i+start_idx] == 'active':
                   figures[shortname][HEADERS[i+start_idx]] = entry.lower()
        
            # if there are multiple file names, takes the first by default
            # get_image(figures[shortname]['chapter'], files[0])

            # donwload print image





    except HttpError as err:
        print(err)
    # Save to current (scripts) folder
    with open('captions.json', 'w') as f:
        json.dump(figures, f, indent=4)

    with open('captions.md', 'w') as f:
        for cap in captions:
            f.write(cap)
    
    os.system('pandoc --reference-doc=custom-reference.docx -o {}captions.docx captions.md'.format(GDRIVE_MANU_PATH))

if __name__ == '__main__':
    main()
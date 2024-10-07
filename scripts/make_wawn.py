#!/usr/bin/env python3
from __future__ import print_function

import json

import io
import os
import argparse

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

parser = argparse.ArgumentParser(description="Make wawn documents.")
parser.add_argument('chapters', type=float, nargs="*",
                    help="chapters to make. Default is all chapters")


def export_docx(real_file_id):
    """Download a Document file in docx format.
    Args:
        real_file_id : file ID of any workspace document format file
    Returns : IO object with location

    Load pre-authorized user credentials from the environment.
    TODO(developer) - See https://developers.google.com/identity
    for guides on implementing OAuth2 for the application.
    """
    creds, _ = google.auth.default()

    try:
        # create gmail api client
        service = build('drive', 'v3', credentials=creds)

        file_id = real_file_id

        # pylint: disable=maybe-no-member
        request = service.files().export_media(fileId=file_id,
                                               mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        file = io.BytesIO()
        downloader = MediaIoBaseDownload(file, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(F'Download {int(status.progress() * 100)}.')

    except HttpError as error:
        print(F'An error occurred: {error}')
        file = None

    return file.getvalue()

def download_docx(file_name, drive_id):
    """Downloads a Document file in docx format and saves it locally
    Args:
        file_name    : path that donwloaded .docx file should be saved to
        real_file_id : file ID of any workspace document format file
    """
    with open(file_name, 'wb') as f:
        w = export_docx(real_file_id=drive_id)
        f.write(w)    

if __name__ == '__main__':
    # 'chapters.json' indexes all chapters as a list, 
    # where each entry is:
    #     [chapter number, title, drive_id, shortname]
    args = parser.parse_args()
    f = open('chapters.json')
    chapters = json.load(f)
    os.system("mkdir -p raw_docs")
    for chapter in chapters:
        ch_num = chapter['chapter']
        # Only print specified chapters unless args.chapters 
        # is empty
        if (len(args.chapters) > 0 and
            float(ch_num) not in args.chapters):
            continue
        shortname = chapter['shortname']
        title = chapter['title']
        drive_id = chapter['drive_id']

        wawn_docx = "raw_docs/{}.docx".format(shortname)

        # Download chapter
        print("Downloading chapter {:02} '{}'".format(ch_num, title))
        download_docx(wawn_docx, drive_id)
        print(" download complete!")

        # Format the documents using the bash script
        os.system("(cd raw_docs; ../format_doc.sh {} {})".format(shortname, ch_num))
        print(" doc formatting complete!")

        # Clean up downloaded .docx file, to prevent unnecessary duplication
        os.system('rm -rf raw_docs/{}.docx'.format(shortname))

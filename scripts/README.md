# Markdown commands
The `make_wawn.py` script builds the entire book as `.md` and `.docx` files from the Google Docs files. There are a few commands you can specify inline in the Google Docs:

**Remove bibliography**
Because Paperpile automatically adds a bibliography to the end of the document, place `{%bibliography_start%}` and `{%bibliography_end%}` around it to remove it.

**Skip a block of text**
Wrap a block of text with `{%skip_start%}` and `{%skip_end%}` to make the block of text disappear. This can be useful in case there's something in the manuscript we wish not to see in the final output.

# Building the book
To build the book, which generates all the markdown files per chapter (and soon all `.docx` files), you must simply run the `make_wawn.py` file within this directory (`/scripts`):

```
python3 make_wawn.py
```

There are times where one just needs to recompile a single or a few chapters using `make_wawn` rather than the whole book each time. So you can also specify which chapters you’d like to make:
```
python make_wawn.py 4.5
```
^ will make Chapter 4.5
```
python make_wawn.py 0 1 2 3
```
^ will make the Introduction, Chapter 1, 2 & 3
```
python make_wawn.py
```
^ will still make the whole book

`make_wawn` will add formatted markdown files to the `/src` directory of this repository according to the following file structure:

```
docs
src
  | introduction
  |    | index.md
  | chapter-01
  |    | index.md
  |
  .... 
book
  | .docx files go here
package.json
REAME.md
```

# making `figures.json`
The script `make_figures_file.py` will create a "figures.json" file containing metadata in the [Figure Data sheet](https://docs.google.com/spreadsheets/d/1VhsLpJhxCAdG90Zuxz3ArKu1u8KsLICI4koL2uAwRsk/edit#gid=4046933). To create a `figures.json` file with the latest metadata, run the command from the `scripts` directory:
```
python make_figures_file.py
```

**Setting up `make_figures_file.py`**
The script will try to pull the latest images from Google Drive. To do so, it uses the local instance of a Google Drive folder. 

To set it up (instructions assume Mac):
1. Install [Drive for Desktop](https://support.google.com/drive/answer/7329379/#macos&zippy=%2Cuse-google-drive-for-desktop-on-macos-high-sierra-or-newer)
_Note: at this time I assume that's all that's needed, as I've set a general path to the Images directory. Give this a try on your system, and if it doesn't work, let me know._

# Setting up
Follow these instructions to set up the wawn build script. You can either set up the environment manually or using conda.

## Install dependencies with Conda
_[Conda](https://docs.conda.io/en/latest/) is an environment and package management system. You can find out how to install it [here](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)._

If you have conda installed, go to the `/scripts` directory and run the command:
```
conda env create -f environment.yml
```

Once that's complete, activate the environment with the command:
```
conda activate wawn
```

## Install dependencies without Conda

Install the Google Drive API

```
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

Install Pandoc for document formatting
```
brew install pandoc
```

_I believe that's it for now. Give it a try, and contact me if it doesn't work for some reason and we can debug it together, as I haven't tried reproducing these steps on another system yet._

## Download auth token
To use the `make_wawn.py` book build script, download this auth file from the [wawn google drive](https://drive.google.com/file/d/1C3bGZjqLHTvEZ31-EWr1rfOrlE_MT16Q/view?usp=sharing).

Note where you've saved the file, e.g., in this directory, and then update the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.

Add to your `.bashrc`, `.bash_profile`, or paste directly into your Terminal:
```
export GOOGLE_APPLICATION_CREDENTIALS="/<path to credentials file>/wawn-354614-cf71ca21de3c.json"
```

I've added `wawn-354614-cf71ca21de3c.json` to the `.gitignore` file so it doesn't accidentally get pushed to the repo.

More details here about setting up credentials: [https://cloud.google.com/docs/authentication/getting-started](https://cloud.google.com/docs/authentication/getting-started)

## Want to add another chapter to the script?
- Invite this email to the relevant google doc: `wawn-214@wawn-354614.iam.gserviceaccount.com`
- Add an additional chapter entry to `chapters.json`

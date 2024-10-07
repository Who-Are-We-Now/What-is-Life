# wii-book

## Setup

Install pandoc and python packages:

```bash
brew install pandoc
```

## Files

### Formatting Files

- `custom-reference.docx`: A word document that contains the formatting for the word document.

### Original Files

- `What is intelligence_ by Blaise.md`: The original markdown file downloaded from the google doc.

### Command Line Files

- `convert.sh`: A shell script that converts the markdown file to a word document. Assumes as input a file named `input.md`.

To make `input.md`, download the manuscript from the google doc as a markdown file to this directory, then copy it to `input.md`.

- `make_captions_file.py`: A python script that makes the `captions.json` file. This is the file that contains the captions and figure numbers for the figures. It pulls from the google sheet.

### Intermediary Files
- `markdown_cleaner.py`: A python script that cleans the markdown file.
- `input.md`: The markdown file to be converted.
- `captions.json`: A json file containing the captions for the figures.
- `output.md`: The output markdown file.
- `output.docx`: The output word document.

## Usage

0. Download the manuscript from the google doc as a markdown file to this directory.

1. Copy the markdown file to `input.md`
```bash
cp What\ is\ intelligence_ by\ Blaise.md input.md
```

2. Make the captions file
```bash
python make_captions_file.py
```

3. Run the shell script to convert the markdown file to a word document
```bash
./convert.sh
```



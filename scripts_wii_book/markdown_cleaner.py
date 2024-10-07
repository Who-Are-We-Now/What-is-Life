import argparse
import re
from collections import namedtuple
import unicodedata
import json

parser = argparse.ArgumentParser(description="Format wii md files")
parser.add_argument('--input', type=str)
parser.add_argument('--output', type=str)
parser.add_argument('--captions_file', type=str, default='captions.json')

args = parser.parse_args()

Line = namedtuple('Line', ['text', 'write'])

with open(args.input, 'r') as f, open(args.output, 'w') as o, open(args.captions_file, 'r') as cf:
    
    captions = json.load(cf)

    def add_caption(line):
        line = line.text

        caption_pattern = r"{%\s*printcaption\s*'(\w+)'\s*%}"
        match = re.search(caption_pattern, line)
        
        if match:
            shortname = match.group(1)
            if shortname in captions:
                figure_number = captions[shortname]["Figure Number"]
                caption_text = captions[shortname]["Caption (must also be in manuscript)"]
                formatted_caption = f"Figure {figure_number}. {caption_text}"
                line = re.sub(caption_pattern, formatted_caption, line)
        
        return Line(line, True)

    def remove_citation_url(line):
        
        line = line.text
        citation_pattern = r"\[([^\]]+?)\]\((https?://.*?)\)"
        line = re.sub(citation_pattern, r"\1", line)
        return Line(line, True)

    for line in f.readlines():
        write = True
        line_normalized = unicodedata.normalize("NFKD", line)
        line = Line(line_normalized, write)

        # TODO: add citation cleaning (removing paperpile urls)
        line = remove_citation_url(line)
        write &= line.write

        # TODO: add caption injection
        line = add_caption(line)
        write &= line.write
        
        if write:
            o.write(line.text)


import json
import os
import glob
from pathlib import Path

# Outputs plot stop count and series count for spreadsheet
path = '../src/assets/data/'
for filename in glob.glob(os.path.join(path, '*.json')): #only process .JSON files in folder.      
	with open(filename, encoding='utf-8', mode='r') as currentFile:
		data = json.load(currentFile)
		if not '-print' in filename:
			if 'seq' in data:
				noStops = len(data['seq'])
			if 'series' in data:
				noSeries = len(data['series'])
			name = Path(filename).stem
			print(name, noStops, noSeries)
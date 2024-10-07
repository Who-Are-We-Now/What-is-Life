import json
chs_f = open('chapters.json', 'r')
chapters = json.load(chs_f)
bibs = ["bib/{:04.1f}".format(c['chapter']) for c in chapters]

f = open('bibliography.md', 'w')
index = open('../src/bibliography/index.md', 'w')
for c, bib in zip(chapters, bibs):
    title = "Chapter {}: {}".format(c['chapter'], c['title'])
    if c['chapter'] == -1:
        title = 'Preface'
    elif c['chapter'] == 0:
        title = "Introduction: {}".format(c['title'])
    elif c['chapter'] == 11.5 or c['chapter'] == 4.5:
        title = "Interlude: {}".format(c['title'])
    f.write("## {}\n".format(title))
    index.write("## {}\n".format(title))
    with open(bib, 'r') as b:
        for l in b:
            f.write(l)
            index.write(l)

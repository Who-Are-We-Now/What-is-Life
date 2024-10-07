import unicodedata
import re
from collections import namedtuple
import argparse
import json

# Flags for debugging
debug_preview_footnote_links = False # shows link editing of footnotes before/after

# Shortcode regex
# Shortcode for single 'img' tag
re_img_shortcode = re.compile(r"\{% img '(.*?)' \%\}")
re_img_i_shortcode = re.compile(r"\{% img_i '(.*?)' \%\}")
re_img_x_shortcode = re.compile(r"\{% img_x '(.*?)' \%\}")
single_img_re = [re_img_shortcode, re_img_i_shortcode, re_img_x_shortcode]
# Shortcode for double 'imgs' tag
re_imgs_shortcode = re.compile(r"\{% imgs '(.*)', '(.*)' \%\}")
re_imgs_i_shortcode = re.compile(r"\{% imgs_i '(.*)', '(.*)' \%\}")
re_imgs_x_shortcode = re.compile(r"\{% imgs_x '(.*)', '(.*)' \%\}")
double_imgs_re = [re_imgs_shortcode, re_imgs_i_shortcode, re_imgs_x_shortcode]
# Blaise default image tag: [[ filename(s) ]] 
re_img_default_tag = re.compile(r"(\[\[|\b)(.+?\.(HEIC|svg|webp|png|jpg|jpeg))\b")
# Match any shortcode, to subsequently parse contents
re_general_shortcode = re.compile(r"{% (.*?) %}")
# Match URL up to previous comma (for removal)
re_comma_url = re.compile(r"(?i)\b(,?\s(?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))")
# Match URL string
re_url = re.compile(r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))")
# Match markdown link
re_md_link = re.compile(r"\[([^][]+)\](\(((?:[^()]+|)+)\))")
# Match comma before right quote before URL, special case for citation
re_comma_quote_url = re.compile(r"(?i)\b(,)”+\s(?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’])")
# Match Footnote
re_is_footnote = re.compile(r"^\[\^\d+\]")
# Match plot stop trigger in [[this format]]
re_double_bracket = re.compile(r'\[\[([^\[\]]*)\]\]')
# Gets name from plot tags
re_plot_name = re.compile(r"plot '(.*?)'")
# For plot pngs
re_empty_bracket = re.compile(r'\[\]')
# Gets name from map tags
re_map_name = re.compile(r"map\ '(.*)'")


parser = argparse.ArgumentParser(description="Format wawn md files")
parser.add_argument('--input', type=str)
parser.add_argument('--output', type=str)
parser.add_argument('--chapter', type=float)
parser.add_argument('--chapters_file', type=str)
parser.add_argument('--plots_file', type=str)
parser.add_argument('--figure_data_file', type=str, default="")
parser.add_argument('--img_dir_path', type=str, default="")
# values - web, book, export 
parser.add_argument('--mode', type=str, default='web')
parser.add_argument('--xfade', type=str, default='../../../scripts/xfade.json')

args = parser.parse_args()

Line = namedtuple('Line', ['text', 'write'])
# TODO: add argparse so it can be reused
f = open(args.input, 'r')
# TODO: add file naming, with dates, etc. once it's added to the codebase
o = open(args.output, 'w')

bib = open('../../../scripts/bib/{:04.1f}'.format((args.chapter)), 'w')

# Load chapters.json file
chs_f = open(args.chapters_file, 'r')
chapters = json.load(chs_f)
chapter_metadata = None

# Load xfade.json file
xfd_f = open(args.xfade, 'r')
xfades = json.load(xfd_f)

for entry in chapters:
    if float(entry['chapter']) == args.chapter:
        chapter_metadata = entry
        break

# Load plots.json file
plots = json.load(open(args.plots_file, 'r'))

img_dir = args.img_dir_path

# Load figure data file (lookup data between shortname and image long-name)
img_lookup_f = open(args.figure_data_file, 'r')
# TODO: process this file (maybe write in separate python file)
img_lookup = json.load(img_lookup_f)

count = 0 # for hbar replace
trigger_n = 0

# Global vars for plot naming
plot_count = 0
plot_name = None

hbar = "-{5,}\n"
# see https://en.wikipedia.org/wiki/Non-breaking_space
nbsp = u'0xa0'
refs = "#refs"
in_ref = False
skip_counter = 0
in_bib = False
in_skip = False

# Outputs metadata as front matter at the top of the markdown file, 
# using the 'front_matter' entry of the chapters.json file
def write_frontmatter(o):
    front_matter = chapter_metadata['front_matter']
    o.write('---\n')
    for k in front_matter:
        o.write("{}: {}\n".format(k, front_matter[k]))
    o.write('---\n\n')

# Returns true if the line needs to be printed
def replace_first_two_hbar(line):
    line = line.text
    m = re.search(hbar, line)
    global count
    if m is not None:
        print("HBAR", m, "count", count)
        # Replace first two ascii hbars with '---'
        if count == 0:
            return Line(line, False) 
        if count < 2:
            count = count + 1
            line = re.sub(hbar, '---', line)
            print("SUB ---", count)
        else:
            # Replace remaining ones with '***', Blaise's original formatting
            line = re.sub(hbar, '***', line)
            print("SUB ***")
    return Line(line, True)

def replace_em_dash(line):
    line = line.text
    line = re.sub('---\ ', '---', line)
    line = re.sub('—\ ', '—', line)
    return Line(line, True)

def remove_underline_in_links(line):
    line = line.text
    line = re.sub(r'\[(\b[^\[]*)\]\{.underline\}', r'\1', line)
    return Line(line, True)

def remove_paperpile_links(line):
    line = line.text
    re_pplink = r'\[([^\[]*)\]\(https?://paperpile.com/(c|b)/\w*/\w*(.*?)\)(.*)'
    while(re.search(re_pplink, line)):
        line = re.sub(re_pplink, r'\1\4', line)
    return Line(line, True)

def remove_bibliography(line):
    line = line.text
    global in_bib

    if "{%bibliography_start%}" in line or "{% bibliography_start %}" in line:
        in_bib = True
        return Line(line, False)
    elif "{%bibliography_end%}" in line or "{% bibliography_end %}" in line: 
        in_bib = False
        return Line(line, False)
    elif in_bib:
        bib.write(line)
        return Line(line, False)
    else:
        return Line(line, True)

def skip_section(line):
    line = line.text
    global in_skip

    if "skip_start" in line and (args.mode in line or "*" in line):
        # skip section specified by 'mode' of tag
        in_skip = True
        return Line(line, False)
    elif "skip_start" in line and args.mode not in line:
        # Remove skip_start tag in alternative cases
        return Line(line, False)
    if "skip_end" in line: 
        in_skip = False
        return Line(line, False)
    elif in_skip:
        return Line(line, False)
    else:
        return Line(line, True)

def process_plot_tags(line):
    global plot_count
    global plot_name
    # if new plot, set count=0, plot_name
    if re.search(re_plot_name, line):
        plot_name = re.search(re_plot_name, line).group(1)
        plot_count = 0
    elif "{% endplot" in line:
        plot_count = 0
        plot_name = None

def process_plot_map_tags_web(line):
    line = line.text
    re_plot = re.compile(r"(\{\% plot '.*?' \%\})")
    re_map = re.compile(r"(\{\% map '.*?' \%\})")
    tags = [re_plot, re_map]
    for rg in tags:
        if rg.search(line):
            sp = rg.split(line)
            #print('PLOT', sp)
            if 'export' in args.mode:
                line = sp[0] + sp[2]
            else:
                line = sp[0] + sp[1] + '\n\n' + sp[2]

    process_plot_tags(line)
    return Line(line, True)

def process_tilde(line):
    line = line.text
    rg = re.compile(r"\n(\~)|^(\~)|(\~)\n")
    if rg.search(line):
        sp = rg.split(line)
        line = sp[0] + '~\n\n' 
        if(sp[4]):
            line += ''.join(map(lambda x: x if x else '', sp[4:]))
    return Line(line, True)

def process_tags(line):
    line = line.text

    # Remove survey tags if not in web mode
    if "{% survey" in line and args.mode != 'web':
        return Line(line, False)
    elif "{% endsurvey %}" in line and args.mode != 'web':
        return Line(line, False)
    # Remove plot tags from export outputs only
    elif ("{% plot" in line or "{% endplot" in line) and 'export' in args.mode:
        process_plot_tags(line)
        line = line.replace('{% endplot %}', '')
        return Line(line, True)
    # Remove animation tag 
    elif ("{% media" in line or "{% endmedia %}" in line) and args.mode != 'web':
        # Change animation tags to img tags for export versions
        if 'export' in args.mode:
            return Line(line.replace('animation', 'img', 1), True)
        # Otherwise, remove
        return Line(line, True)
    elif ("{% map" in line or "{% endmap %}" in line) and args.mode != 'web':
        # Change map tags to img tags for export versions
        #print('MAP', line)
        if re_map_name.search(line):
            name = re_map_name.search(line).group(1)
            if 'export' in args.mode and name in img_lookup:
                line = line.replace("{% map", "{% img")
                line = line.replace("{% endmap", "{% endimg")
                return Line(line, True)
        # Otherwise, keep with tags
        return Line(line, True)
    else:
        return Line(line, True)

def parse_shortcodes(line):
    # Stub to consolidate all shortcode processing
    # Is in progress, but right now passes the line through with no eddits
    line = line.text
    
    if (re_general_shortcode.search(line)):
        matches = re_general_shortcode.findall(line)
        #print("Matches:", matches)
        # Parse each match
            # Apply function to each match, each returns the result 
    

    return Line(line, True)

def remove_media_tag(line):
    # Remove lines that contain images embedded
    # in the original Google doc. Used for 
    # web version only. 
    line = line.text
    rg = re.compile(r"(\!\[\]\(media\/image.*?\})")
    if rg.search(line):
        sp = rg.split(line)
        line = sp[0] + sp[2]
        #print('MEDIA line', line)
        return Line(line, True)
    else:
        return Line(line, True)

def remove_section_heading(line):
    # Remove section headers for (web files)
    line = line.text

    if ("# Part" in line or 
        "## Interlude" in line or
        "## Chapter" in line or
        "# Appendix" in line or
        "# Preface" in line or
        "# Introduction" in line):
        return Line(line, False)
    else:
        return Line(line, True)

def remove_rtl(line):
    line = line.text
    if '{dir="rtl"}' in line and args.mode == 'export-pdf':
        line = line.replace('{dir="rtl"}', '')
    return Line(line, True)

skip_eq_count = 0
def skip_equation_imgs(line):
    global skip_eq_count
    line = line.text

    if 'equation1' in line or \
        'equation2' in line or \
        'equation3' in line:
        skip_eq_count += 1
        return Line(line, False)
    elif 'endimg' in line and skip_eq_count > 0:
        skip_eq_count += -1
        return Line(line, False)
    else:
        return Line(line, True)

def insert_chapter_break(line):
    line = line.text
    if '[^1]:' in line:
        line = "\n\\newpage\n\n" + line 
    return Line(line, True)

def remove_line_break(line):
    line = line.text
    if "* * *" in line:
        return Line(line, False)
    return Line(line, True)

def _insert_image_by_shortname(shortname):
    # Get to filename using lookup table
    try:
        # if  args.mode == 'web' or 'export' in args.mode:
        if  args.mode == 'web':
            file_idx = 'file_web'
        else:
            file_idx = 'file_print'
        img_name = img_lookup[shortname][file_idx][0]
        if 'caption' in img_lookup[shortname]:
            caption = img_lookup[shortname]['caption']
        else:
            caption = 'caption text'
    except KeyError as e:
        print('KeyError, shortname:', shortname)
        return Line('ERROR: ' + str(line), True)
    # except IndexError as e:
    #     print('IndexError, shortname:', shortname)
    #     return Line('ERROR: ' + str(line), True)
    return img_name, caption

def process_image_tag(line):
    line = line.text
    imgs = []
    # Match image tag type
    # IF `img` shortcode
    for reg in single_img_re[:2]:
        if (reg.search(line)):
            m = reg.search(line)
            sp = reg.split(line)
            shortname = m.group(1)
            img_name, caption = _insert_image_by_shortname(shortname)
            imgs.append((img_name, caption, sp))
            return _insert_images(imgs)
    if (single_img_re[2].search(line)):
            m = single_img_re[2].search(line)
            sp = single_img_re[2].split(line)
            xshortname = m.group(1)
            if xshortname in xfades:
                print(xshortname)
                xf = xfades[xshortname]
                if xf['type'] == 'multi_caption':
                    for i, img_d in enumerate(xf['input_imgs']):
                        shortname = list(img_d.keys())[0]
                        img_name, caption = _insert_image_by_shortname(shortname)
                        if i == 0:
                            imgs.append((img_name, caption, [sp[0], sp[1], '']))
                        elif i == len(xf['input_imgs'])-1:
                            imgs.append((img_name, caption, ['', '', sp[2]]))
                        else:
                            imgs.append((img_name, caption, ['', '', '']))
                if xf['type'] == 'single_caption':
                    print('single caption', xshortname)
                    img_name, caption = _insert_image_by_shortname(xshortname)
                    imgs.append((img_name, caption, sp))
            return _insert_images(imgs)
    # IF `imgs` shortcode
    for reg in double_imgs_re[:2]:
        if (reg.search(line)):
            m = reg.search(line)
            sp = reg.split(line)
            shortname = m.group(1)
            img_name, caption = _insert_image_by_shortname(shortname)
            imgs.append((img_name, caption, [sp[0], sp[1], '']))
            shortname = m.group(2)
            img_name, caption = _insert_image_by_shortname(shortname)
            imgs.append((img_name, caption, ['', sp[2], sp[3]]))
            return _insert_images(imgs)
    # IF [[]] tag, 
    if (re_img_default_tag.match(line)):
        # Get file name from tag
        m = re_img_default_tag.search(line)
        if m:
            img_name = m.group(2)
            caption = 'caption text'
            sp = re_img_default_tag.split(line)
            imgs.append((img_name, caption, sp))
            return _insert_images(imgs)
    elif 'media/image' in line:
        lines = [Line(line, True)] 
        if args.mode == 'export-pdf':
            # replace media/image with ch-name/media/image
            line = line.replace("media/", "{}/media/".format(chapter_metadata["shortname"]))
            if 'svg' in line:
                print("skipping svg in line", line)
                return [Line(line, False)]
            lines = [Line(line, True)] 
        if plot_name:
            global plot_count
            plot_count += 1
            #print(line, plot_name, plot_count)
            caption = '[' + _get_plot_caption(plot_name, plot_count) + ']'
            line = line.replace('[]', caption)
            lines = [Line(line, True)] 
        return lines 
    elif "{% endimg" in line:
        # Skip line
        rg = re.compile(r'\{\% endimg \%\}')
        line1 = re.split(rg, line)[0] + '\n'
        return [Line(line1, True)]
    # elif "{% endimgs %}" in line:
    #     # Skip line
    #     return [Line(line, False)]
    else:
        # No match
        return [Line(line, True)]

def process_endimg_export(line):
    line = line.text
    endimg_variants = [
        (re.compile(r'(\{\% endimg \%\})'),'{% endimg %}'),
        (re.compile(r'(\{\% endimg_i \%\})'), '{% endimg_i %}'),
        (re.compile(r'(\{\% endimgs_i \%\})'), '{% endimgs_i %}'),
        (re.compile(r'(\{\% endimg_x \%\})'), '{% endimg_x %}'),
        ]
    for rg, tag in endimg_variants:
        if tag in line:
            sp = re.split(rg, line)
            line = sp[0] + ''.join(sp[2:])
            #print('export endimg', sp)

    return Line(line, True)

def process_endimg_web(line):
    line = line.text
    endimg_variants = [
        (re.compile(r'(\{\% endimg \%\})'),'{% endimg %}'),
        (re.compile(r'(\{\% endimg_i \%\})'), '{% endimg_i %}'),
        (re.compile(r'(\{\% endimgs_i \%\})'), '{% endimgs_i %}'),
        (re.compile(r'(\{\% endimg_x \%\})'), '{% endimg_x %}'),
        ]
    for rg, tag in endimg_variants:
        if tag in line:
            # Skip line
            sp = re.split(rg, line)
            #print('ENDIMG loop', sp)
            line1 = sp[0]
            line2 = tag+'\n\n' + sp[2]
            line = line1+'\n'+line2
            if len(sp) == 5:
                line += '\n'+tag+'\n' + sp[4]
            return Line(line, True)
    return Line(line, True)


def process_image_tag_web(line):
    line = line.text
    lines = []
    for reg in single_img_re:
        if (reg.search(line)):
            m = reg.search(line)
            sp = reg.split(line)
            pre_line = sp[0]
            org_line = sp[2]
            #print('line', m, m.group(0), org_line, reg.split(line))
            shortcode_line = pre_line + m.group(0) + '\n\n'
            lines = [Line(shortcode_line, True), Line(org_line, True)]
            return lines
    for reg in double_imgs_re:
        if (reg.search(line)):
            m = reg.search(line)
            org_line = reg.split(line)[3]
            #print('line_s', m, m.group(0), 'split>', reg.split(line))
            shortcode_line = m.group(0) + '\n'
            lines = [Line(shortcode_line, True), Line(org_line, True)]
            return lines
    return lines
    # for reg in double_imgs_re:
    #     if (reg.search(line)):
    #         m = reg.match(line)

def _insert_images(imgs): 
    lines = []
    for img_name, caption, sp in imgs: 
        #Assumes path src_dir/assets/shortname/img_name
        img_name = '/'.join([img_dir, img_name])
        # Update to .md format with file path 
        if args.mode == 'export-pdf':
            caption = caption.replace('<i>', '*').replace('</i>','*')
        line = sp[0]
        line += '\n![{}]({})'.format(caption, img_name) + '{{ width="{:.2f}in" }}\n'.format(4.5 / len(imgs))
        line += '\n'
        line += sp[2]
        lines.append(Line(line, True))

    return lines

def _get_plot_caption(name, count):
    #print(name, count)
    if name + '-print' in plots:
        p_name = name + '-print' 
    else:
        p_name = name + str(count) + '-print' 
    # handle case that plot1 was scrapped
    if p_name not in plots: 
        p_name = name + str(count+1) + '-print' 
    caption = [
                plots[p_name]['chapter'],
                plots[p_name]['title'], '|',
                plots[p_name]['colors']]
    if args.mode == 'export':
        caption.append('|')
        caption.append('({})'.format(p_name))
    return ' '.join(caption)

# Returns true if the line needs to be printed
def remove_ref_metadata(line):
    line = line.text
    # For removing references metadata
    global skip_counter
    global in_ref
    # Detect start of references
    if refs in line:
        in_ref = True
    
    # Skip the next 3 lines if a '#ref' string is detected
    elif "#ref" in line:
        skip_counter = 3
    elif skip_counter > 0:
        skip_counter -= 1
    
    # Remove final ':::' flag
    elif ":::" and in_ref:
        in_ref = False
    else:
        return Line(line, True)

    return Line(line, False)

# For book edition, removes tags (like image tags)
def remove_web_tags(line):
    line = line.text
    # Search for image tags, skip line if present
    regexp = re.compile(r'\[\[.*\]\]\n')
    if regexp.search(line):
        # Skip line
        return Line(line, False)
    else:
        return Line(line, True)

def remove_default_image_tag(line):
    line = line.text
    rg = re.compile(r"(\!\[\]\(media\/image.*?\})")
    if rg.search(line):
        sp = rg.split(line)
        error = "\n[[ untagged diagram embedded in original document has been removed ]]\n"
        line = sp[0] + error + sp[2]
        return Line(line, True)
    else:
        return Line(line, True)

def shorten_citation_url(line):
    line = line.text
    # skip markdown URLs
    if re_is_footnote.search(line) and re_md_link.search(line):
        if debug_preview_footnote_links:
            print('skip', line)
        return Line(line, True)
    # if footnote with URL
    if re_is_footnote.search(line) and re_url.search(line):
        if debug_preview_footnote_links:
            print("original \t", line)
        url = re_url.search(line).group(0)
        sub = '[link]({})'.format(url)
        line = re.sub(re_url, sub, line)
        if debug_preview_footnote_links:
            print("short url \t", line)
    return Line(line, True)

def remove_citation_url(line):
    line = line.text
    # Single exception case
    if 'www.heathsociety.org' in line:
        return Line(line, True)
    if re_is_footnote.search(line) and re_md_link.search(line):
        if debug_preview_footnote_links:
            print('skip', line)
        return Line(line, True)
    # if footnote with URL
    if re_is_footnote.search(line) and re_comma_url.search(line):
        if debug_preview_footnote_links:
            print("original \t", line)
        # remove url up through comma (assumes period at the end)
        ll = re.sub(re_comma_quote_url, '”', line)
        line = re.sub(re_comma_url, '', ll)
        if debug_preview_footnote_links:
            print("no url \t\t", line)
    return Line(line, True)

def remove_plot_stops(line):
    # Remove [[plot stops]]
    line = line.text
    if re_double_bracket.search(line):
        line = re.sub(re_double_bracket, r'\1', line)
    return Line(line, True)

def _format_seq_count(m):
    # Used for format stubstitution where plot stops were used
    global trigger_n
    s = m.group(1)
    trigger_n+=1
    out = '[{}]'.format(s)+'{data-seq=' + str(trigger_n) +'}'
    #print(out, plot_name, plot_count)
    return out

def format_plot_stops(line):
    global trigger_n
    line = line.text
    if re_double_bracket.search(line):
        bracket_i = re_double_bracket.search(line).start()
        if '{% endplot' in line and line.index('{% endplot') < bracket_i:
            trigger_n = 0
        if re_double_bracket.search(line):
            line = re.sub(re_double_bracket, _format_seq_count, line)
        if '{% endplot' in line and line.index('{% endplot') > bracket_i:
            trigger_n = 0
    else:
        if '{% endplot' in line:
            trigger_n = 0
        if re_double_bracket.search(line):
            line = re.sub(re_double_bracket, _format_seq_count, line)
    return Line(line, True)

def escape_c_symbol(line):
    #for chapter 5
    line = line.text
    rg = re.compile(r'(\(([C|c])\))')
    if rg.search(line):
        sp = rg.split(line)
        line = sp[0]
        i = 3
        while i < len(sp):
            line += '\\('+sp[i-1]+'\\)' + sp[i]
            i += 3
    return Line(line, True)

def fix_co2(line):
    line = line.text
    line = line.replace('CO~2~', 'CO<sub>2</sub>')
    return Line(line, True)

write_frontmatter(o)

for line in f.readlines():
    write = True
    line_normalized = unicodedata.normalize("NFKD", line)
    line = Line(line_normalized, write)

    # line = replace_first_two_hbar(line)
    # write &= line.write

    line = replace_em_dash(line)
    write &= line.write

    line = remove_underline_in_links(line)
    write &= line.write

    line = remove_paperpile_links(line)
    write &= line.write

    line = remove_ref_metadata(line)
    write &= line.write

    line = remove_bibliography(line)
    write &= line.write

    line = skip_section(line)
    write &= line.write

    line = process_tags(line)
    write &= line.write

    line = process_plot_map_tags_web(line)
    write &= line.write

    line = process_tilde(line)
    write &= line.write

    line = escape_c_symbol(line)
    write &= line.write

    # line = parse_shortcodes(line)
    # write &= line.write

    if args.mode == 'web':
        line = fix_co2(line)
        write &= line.write
        
        line = remove_media_tag(line)
        write &= line.write

        line = remove_section_heading(line)
        write &= line.write

        line = shorten_citation_url(line)
        write &= line.write

        line = format_plot_stops(line)
        write &= line.write

        line = process_endimg_web(line) 
        write &= line.write

        did_write = False
        # Deviant, because of the double images
        lines = process_image_tag_web(line)
        for l in lines:
            write &= l.write
            if (write):
                o.write(l.text)
                did_write = True
        if did_write:
            write = False
    else:
        line = remove_plot_stops(line)
        write &= line.write


    if args.mode == 'book':
        line = remove_citation_url(line)
        write &= line.write

        line = remove_default_image_tag(line)
        write &= line.write

    if args.mode == 'export-pdf':
        line = remove_rtl(line)
        write &= line.write

        line = skip_equation_imgs(line)
        write &= line.write

        # insert /newline command before footnotes
        line = insert_chapter_break(line)
        write &= line.write


    if 'export' in args.mode:
        line = remove_citation_url(line)
        write &= line.write

        line = remove_line_break(line)
        write &= line.write

        line = process_endimg_export(line)
        write &= line.write

        # Deviant, because of the double images
        lines = process_image_tag(line)
        for l in lines:
            write &= l.write
            if (write):
                o.write(l.text)
    elif write:
        o.write(line.text)



bib.close()
o.close()
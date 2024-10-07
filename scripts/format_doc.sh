# This file processes each .docx file downloaded from google docs, 
# outputs 
# 1) a .md file with formatting for 11y called index_<file name>
# 2) a .docx file with formatting for importing to in-design
# Args:
# 1 - chapter shortname
# 2 - chapter number

mkdir tmp
cd tmp
pandoc -t markdown-smart-grid_tables-simple_tables-multiline_tables --wrap=preserve -o 0_${1}.md ../${1}.docx
unzip ../${1}.docx > /dev/null
mkdir -p word/media
mv word/media . > /dev/null

sed -e 's!\\\[\\@\([^}]*\)\\\]!\[@\1]!g;s@\\@@g;s/^###\ />\ /g' 0_${1}.md > 1_${1}.md 

# generate .md file with formatted references OR...
# pandoc --wrap=preserve -t markdown-citations --bibliography=../../references.bib --csl=../../chicago-fullnote-bibliography.csl -o 2_${1}.md 1_${1}.md

# sed -e 's@\\@@g' 2_${1}.md > 3_${1}.md

# python ../../process_md.py --input 3_${1}.md --output ../index_${1}.md

# gdrive_dir='/Volumes/GoogleDrive/.shortcut-targets-by-id/1wD90KbjALP5oSHj80fcvD4GazlQ15Nyh/WAWN_team_share'
gdrive_dir="/Users/johan/Library/CloudStorage/GoogleDrive-johanmichalove@gmail.com/.shortcut-targets-by-id/1wD90KbjALP5oSHj80fcvD4GazlQ15Nyh/WAWN_team_share"
gdrive_dir="/Users/johan/Google\ Drive/My\ Drive/wawn\ -\ 2022/WAWN\ team\ share"

gdrive_dir=$WAWN_GDRIVE_PATH
book_dir="${gdrive_dir}/Manuscript.typesetting"
export_dir="${gdrive_dir}/Manuscript.export"
pdf_dir="${gdrive_dir}/Manuscript.pdf"
src_dir='../../../src'
scripts_dir='../..'
pdf_md_dir="${scripts_dir}/pdf_export/tmp"
# book_dir='../../../book'
# export_dir='../../../export'

mkdir -p ${src_dir}/${1}

# ...OR without citation setting
python ../../process_md.py --input 1_${1}.md --chapter ${2} --output ${src_dir}/${1}/index.md --chapters_file ${scripts_dir}/chapters.json --plots_file ${scripts_dir}/plots.json --mode web --figure_data_file ${scripts_dir}/figures.json --img_dir_path ${src_dir}/assets/images/${1}

# Currenly only pushes to google drive on Johan's setup
if [[ $gdrive_dir =~ "johan" ]]; then
    # generate .docx file WITHOUT images and IMAGE TAGS
    # TODO -- need to test with properly formatted file

    python ../../process_md.py --input 1_${1}.md --chapter ${2} --output ${book_dir}/${1}.md --chapters_file ${scripts_dir}/chapters.json --plots_file ${scripts_dir}/plots.json --mode book --figure_data_file ${scripts_dir}/figures.json --img_dir_path ${src_dir}/assets/images/${1}
    pandoc --reference-location=document --lua-filter=${scripts_dir}/stripmeta.lua -o ${book_dir}/${1}.docx --reference-doc=${scripts_dir}/custom-reference.docx ${book_dir}/${1}.md 
    rm ${book_dir}/${1}.md

    # generate .docx file WITH images and EMBEDDED IMAGES
    python ../../process_md.py --input 1_${1}.md --chapter ${2} --output ${export_dir}/${1}.md --chapters_file ${scripts_dir}/chapters.json --plots_file ${scripts_dir}/plots.json --mode export --figure_data_file ${scripts_dir}/figures.json --xfade ${scripts_dir}/xfade.json --img_dir_path ${src_dir}/assets/images/${1}
    pandoc --reference-location=document --lua-filter=${scripts_dir}/stripmeta.lua -o ${export_dir}/${1}.docx --reference-doc=${scripts_dir}/custom-reference.docx ${export_dir}/${1}.md 

    # generate .md file WITH images and EMBEDDED IMAGES for book-pdf export
    mkdir -p ${pdf_md_dir}/${1}
    rm -rf ${pdf_md_dir}/${1}/media 
    mv media ${pdf_md_dir}/${1} 
    python ../../process_md.py --input 1_${1}.md --chapter ${2} --output ${pdf_md_dir}/${1}.md --chapters_file ${scripts_dir}/chapters.json --plots_file ${scripts_dir}/plots.json --mode export-pdf --figure_data_file ${scripts_dir}/figures.json --xfade ${scripts_dir}/xfade.json --img_dir_path ${src_dir}/assets/images/${1}
    # pandoc --reference-location=document --lua-filter=${scripts_dir}/stripmeta.lua -o ${pdf_dir}/${1}.pdf ${export_dir}/${1}.md -t latex --pdf-engine=xelatex
    rm ${export_dir}/${1}.md

    # pandoc --reference-location=document --lua-filter=${scripts_dir}/stripmeta.lua -o ${scripts_dir}/bibliography.docx --reference-doc=${scripts_dir}/custom-reference.docx ${scripts_dir}/bibliography.md 
    # pandoc --reference-location=document --lua-filter=${scripts_dir}/stripmeta.lua -o ${scripts_dir}/credits.docx --reference-doc=${scripts_dir}/custom-reference.docx ${scripts_dir}/credits.md 
fi

cd ..
rm -rf tmp
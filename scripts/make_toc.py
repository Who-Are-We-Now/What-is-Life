import os
import re
import json
from PIL import Image  # Make sure to install the Pillow library

allowed_shortcodes = ['img', 'plot', 'img_x', 'media', 'media_f', 'map', 'map_f', 'img_i', 'imgs_i', 'audio', 'video']

def get_image_size(image_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            return width, height
    except Exception as e:
        print(f"Error getting size for image {image_path}: {e}")
        return None, None

def extract_ids_from_file(file_path, figures_data):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        shortcode_pattern = '|'.join(allowed_shortcodes)
        regex_pattern = r'\{%\s*(' + shortcode_pattern + r')\s*((?:\'[^\']+\',?\s*)+)\s*%\}((.*?){%|\s*end\s*\1\s*%\})'

        matches = re.findall(regex_pattern, content, re.DOTALL)

        ids_and_data = []
        
        for match in matches:
            shortcode = match[0]
            identifiers_str = match[1]
            content_inside = match[2]
            
            # Use a regular expression to extract individual identifiers
            identifiers = [id.strip().strip("'") for id in identifiers_str.split(',')]


            # Initialize a new entry for each iteration
            for identifier in identifiers:
                entry = {"shortcode": shortcode, "identifier": identifier}

                # Check if the identifier is in figures_data and update entry with file_web if available
                if identifier in figures_data:
                    file_web_from_data = figures_data[identifier].get("file_web")
                    xfade_name_from_data = figures_data[identifier].get("xfade_name")

                    # Handle the case where file_web_from_data is a list
                    if isinstance(file_web_from_data, list):
                        # Pick the first image, or set file_web_from_data to None if the list is empty
                        file_web_from_data = file_web_from_data[0] if file_web_from_data else None

                    # Set "file_web" for shortcodes 'img' and 'img_i'
                    if shortcode in ('img', 'img_i', 'imgs_i', 'media', 'media_f', 'audio'):
                        entry["file_web"] = file_web_from_data
                        entry["xfade_name"] =  xfade_name_from_data

                # Image shortcode: extract width and height for images
                if shortcode in ('img', 'img_i', 'imgs_i', 'media', 'media_f', 'audio') and 'file_web' in entry:
                    file_web = entry['file_web']
                    xfade_name = entry['xfade_name']

                    # Ensure file_web is a list
                    if isinstance(file_web, list):
                        file_web = file_web[0] if file_web else None

                    # Update directory_path and filename
                    directory_path, filename = os.path.split(file_path)

                    folder_name = os.path.basename(directory_path)
                    image_path = os.path.join('../src', 'assets', 'images', folder_name, file_web)

                    width, height = get_image_size(image_path)

                    thumbnail_width = width * 80 / height

                    if width is not None and height is not None:
                        entry.update({"chapter": folder_name, "width": width, "height": height, "thumbnail_width": thumbnail_width, "xfade_name":xfade_name })

                # Process other shortcodes
                elif shortcode in allowed_shortcodes:
                    # Update directory_path and filename
                    directory_path, filename = os.path.split(file_path)

                    # Update "file_web" for other shortcodes
                    folder_name = os.path.basename(os.path.normpath(directory_path))
                    thumb_filename = f"{identifier}"

                    # Check for known image formats
                    thumb_extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
                    for extension in thumb_extensions:
                        thumb_image_path = os.path.join('../src', 'assets', 'images', 'toc',folder_name, thumb_filename + extension)

                        # Check if the image exists
                        if os.path.isfile(thumb_image_path):
                            # Update "file_web" in the entry
                            entry.update({"file_web": thumb_filename + extension})

                            # Extract width and height for images
                            width, height = get_image_size(thumb_image_path)
                            thumbnail_width = width * 80 / height

                            if width is not None:
                                entry.update({ "chapter": folder_name, "width": width, "height": height, "thumbnail_width": thumbnail_width, "xfade_name" : ""})

                # Append the current state to the list
                ids_and_data.append((identifier, entry.copy()))
                print(f"{folder_name}/{shortcode}, {identifier}")


        return ids_and_data


def collect_ids_from_directory(directory_path, figures_data):
    all_data = {}
    for root, dirs, files in os.walk(directory_path):
        if os.path.basename(root) in ['maps', 'plots']:
            continue  
        for file in files:
            if file == 'index.md':
                folder_name = os.path.basename(os.path.normpath(root))
                # print(f"Processing folder: {folder_name}")

                file_path = os.path.join(root, file)
                # print(f"File path: {file_path}")
                ids_and_data = extract_ids_from_file(file_path, figures_data)

                # if folder_name not in all_data:
                all_data[folder_name] = {}

                for identifier, data in ids_and_data:
                    all_data[folder_name][identifier] = data
    return all_data

def print_id():
    src_directory = os.path.join(os.pardir, 'src')
    scripts_directory = os.path.dirname(os.path.abspath(__file__))

    toc_output_file_path = os.path.join(src_directory, '_data', 'toc.json')
    figures_file_path = os.path.join(scripts_directory, 'figures.json')

    # Load figures data from 'figures.json'
    with open(figures_file_path, 'r', encoding='utf-8') as figures_file:
        figures_data = json.load(figures_file)

    # Collecting all ids and shortcodes
    all_data = collect_ids_from_directory(src_directory, figures_data)

    # Merge all dictionaries into a single dictionary
    flattened_data = {k: v for inner_data in all_data.values() for k, v in inner_data.items()}

    # Writing the collected data to 'toc.json'
    with open(toc_output_file_path, 'w', encoding='utf-8') as toc_output_file:
        json.dump(flattened_data, toc_output_file, indent=2)

    print(f"Collected ids have been saved to {toc_output_file_path}")

if __name__ == "__main__":
    print_id()

import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add @ts-nocheck if not there
    if not content.startswith('// @ts-nocheck'):
        content = '// @ts-nocheck\n' + content

    # Fix imports: remove .js extension, update paths
    # from "../../utils/geometry.js" -> from "../geometry"
    content = content.replace('../../utils/geometry.js', '../geometry')
    # from "./effects/fireEffect.js" -> from "./effects/fireEffect"
    content = re.sub(r'from\s+"([^"]+)\.js"', r'from "\1"', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

directory = 'src/simulation/renderer'
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Files processed successfully.")

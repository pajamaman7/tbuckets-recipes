import os
import re
from pathlib import Path

def update_recipes_alphabetical(markdown_file_path, recipes_directory_path):
    """
    Update the recipes markdown file with an alphabetical list of all recipes.
    
    Args:
        markdown_file_path (str): Path to the markdown file
        recipes_directory_path (str): Path to the recipes directory
    """
    
    # Get all recipe files from directory
    recipe_files = list(Path(recipes_directory_path).glob('*.md'))
    
    # Create recipe entries
    recipes = []
    for recipe_file in recipe_files:
        recipe_id = recipe_file.stem
        recipe_name = ' '.join(word.capitalize() for word in recipe_id.split('_'))
        description = get_recipe_description(recipe_file)
        
        link = f"[{recipe_name}](?recipe={recipe_id})"
        if description:
            link += f" - {description}"
        
        recipes.append((recipe_name, link))
    
    # Sort alphabetically by recipe name
    recipes.sort(key=lambda x: x[0])
    
    # Generate new markdown content
    new_content = "# Recipes\n\n"
    
    for recipe_name, link in recipes:
        new_content += f"* {link}\n"
    
    # Write updated content back to file
    with open(markdown_file_path, 'w') as f:
        f.write(new_content)
    
    print(f"Updated recipes list with {len(recipes)} recipes in alphabetical order")

def get_recipe_description(recipe_file_path):
    """
    Attempt to extract a description from the recipe file.
    """
    try:
        with open(recipe_file_path, 'r') as f:
            content = f.read()
            # Look for a description in the first few lines after any title
            lines = content.split('\n')
            for i, line in enumerate(lines):
                line = line.strip()
                if line and not line.startswith('#') and len(line) > 20:
                    return line
    except Exception as e:
        print(f"Could not read description from {recipe_file_path}: {e}")
    
    return None

# Usage
if __name__ == "__main__":
    markdown_file = "./recipes.md"  # Update this path to your markdown file
    recipes_dir = "./recipes"  # Update this path to your recipes directory
    
    update_recipes_alphabetical(markdown_file, recipes_dir)

const md = window.markdownit();

async function loadRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeFile = urlParams.get('recipe');

    if (!recipeFile) {
        return;
    }

    const result = await fetch(`recipes/${recipeFile}.md`);
    return result.text();
}

async function loadRecipeList() {
    const result = await fetch(`recipes.md`);
    return result.text();
}

async function parseMarkdown(markdown) {
    // Extract title (# TITLE)
    const titleMatch = markdown.match(/^# (.+)/m);
    const title = titleMatch ? titleMatch[1] : '';

    // Extract optional subheader (line after title, before ##)
    const subheaderMatch = markdown.match(/^# .+\n(.+?)\n##/m);
    const subheader = subheaderMatch ? subheaderMatch[1] : '';

    // Extract each section by heading
    const infoMatch = markdown.match(/## info\s+([\s\S]+?)(?=\n## |$)/);
    const info = infoMatch ? infoMatch[0] : '';

    const ingredientsMatch = markdown.match(/## ingredients\s+([\s\S]+?)(?=\n## |$)/);
    const ingredients = ingredientsMatch ? ingredientsMatch[0] : '';

    const stepsMatch = markdown.match(/## steps\s+([\s\S]+?)(?=\n## |$)/);
    const steps = stepsMatch ? stepsMatch[0] : '';

    const notesMatch = markdown.match(/## notes\s+([\s\S]+?)(?=\n## |$)/);
    const notes = notesMatch ? notesMatch[0] : '';

    const imagesMatch = markdown.match(/## images\s+([\s\S]+?)(?=\n## |$)/);
    const images = imagesMatch ? imagesMatch[0] : '';

    const basedOnMatch = markdown.match(/## based on\s+([\s\S]+?)$/);
    const basedOn = basedOnMatch ? basedOnMatch[0] : '';

    return [title, subheader, info, ingredients, images, steps, notes, basedOn];
}

async function init() {
    const recipe = await loadRecipe();

    if (!recipe) {
        const recipeList = await loadRecipeList();
        document.getElementById("recipe-list").innerHTML
            = md.render(recipeList);
        document.getElementById("recipe-list").style.display = "block";
        document.getElementById("recipe-container").style.display = "none";
        document.getElementById("recipe-list").style.display = "block";
        return;
    }

    const [title, subheader, info, ingredients, images, steps, notes, basedOn] = await parseMarkdown(recipe);
    
    document.title = title;

    document.getElementById("title").innerHTML = title;
    
    if (subheader) {
        document.getElementById("subheader").innerHTML = subheader;
        document.getElementById("subheader").style.display = "block";
    }

    if (info) {
        document.getElementById("info-container").innerHTML = md.render(info);
    }

    if (ingredients) {
        document.getElementById("ingredients-container").innerHTML = md.render(ingredients);
    }

    if (images) {
        document.getElementById("images-container").innerHTML = md.render(images);
    }

    if (steps) {
        document.getElementById("steps-container").innerHTML = md.render(steps);
    }

    if (notes) {
        document.getElementById("notes-container").innerHTML = md.render(notes);
    }

    if (basedOn) {
        document.getElementById("based-on-container").innerHTML = md.render(basedOn);
    }

    document.getElementById("recipe-container").style.display = "block";
}

init().catch(error => console.log(error));

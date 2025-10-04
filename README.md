# 👨‍🍳 Recipes

A list of personal recipes in markdown format and the source-code to render them
on a website.

## Format

### Recipes

While recipes are 100% markdown, this does not mean, that every markdown
document is compatible. Recipes must follow a specific format that looks like
the one shown below:

```markdown
# Recipe Title

A description of the recipe (or even better an image).

## Ingredients

A list with all ingredients. Can use all markdown feature including "smaller"
headings.

## Instructions

A list with the instructions. Can use all markdown feature including "smaller"
headings.

## Images

A list with images (optional).
```

The titles for ingredients and the instructions are not fixed and can be for
example in your local language. Only the order matters.

There must be exactly one `h1` header and two to three `h2` headers. If the
markdown does not fullfil these requirements, the script might not render the
recipe correctly or maybe even not at all.

### Recipe list

The recipe list is rendered from the `recipes.md` file and can be in any format
you want. The website just renders the markdown without any special treatment.

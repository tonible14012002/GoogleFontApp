

const CATEGORY_CHOICES = ['Sans serif', 'Serif', 'Display', 'Handwriting', 'Monospace']
const CATEGORY_CHOICES_VALUES = CATEGORY_CHOICES.map(cate => cate.replace(" ", "-").toLowerCase())

const getCategoriesFromParam = (searchParams) => {
    // => [ categorieFiltersFounded, paramIsValid ]

    const categoryParam = searchParams.get("category")

    if (!categoryParam) {
        return [CATEGORY_CHOICES_VALUES, true]
    }

    const categories = categoryParam.split(",")
    const validCategories = categories.filter(cate => CATEGORY_CHOICES_VALUES.includes(cate))

    if (!validCategories.length) {
        return [CATEGORY_CHOICES_VALUES, false]
    }

    if (categories.length === validCategories) {
        return [categories, true]
    }

    return [validCategories, false]
}

export { CATEGORY_CHOICES, CATEGORY_CHOICES_VALUES, getCategoriesFromParam }
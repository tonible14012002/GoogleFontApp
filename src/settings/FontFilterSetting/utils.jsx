import {
  LANGUAGE_CHOICE_VALUES,
  DEFAULT_LANGUAGE_FILTER_VALUE,
  CATEGORY_CHOICES_VALUES
} from './constants'

const getFilterLanguageFromParam = (sParams) => {
  let filterLanguage = sParams.get('subset')
  if (!filterLanguage) {
    return [DEFAULT_LANGUAGE_FILTER_VALUE, true]
  }
  if (!LANGUAGE_CHOICE_VALUES.find((lang) => lang === filterLanguage)) {
    return [(filterLanguage = DEFAULT_LANGUAGE_FILTER_VALUE), false]
  }
  return [filterLanguage, true]
}

const getCategoriesFromParam = (searchParams) => {
  // => [ categorieFiltersFounded, paramIsValid ]

  const categoryParam = searchParams.get('category')

  if (!categoryParam) {
    return [CATEGORY_CHOICES_VALUES, true]
  }

  const categories = categoryParam.split(',')
  const validCategories = categories.filter((cate) => CATEGORY_CHOICES_VALUES.includes(cate))

  if (!validCategories.length) {
    return [CATEGORY_CHOICES_VALUES, false]
  }

  if (categories.length === validCategories) {
    return [categories, true]
  }

  return [validCategories, false]
}

const getQueryFromParam = (searchParam) => {
  let queryString = searchParam.get('query') || ''
  return [queryString]
}

export { getFilterLanguageFromParam, getCategoriesFromParam, getQueryFromParam }

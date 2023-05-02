
const LANGUAGE_CHOICES = [
    "All Language",
    "Latin",
    "Cyrillic",
    "Greek",
    "Vietnamese",
    "Thai",
    "Arabic",
    "Hebrew",
    "Devanagari",
    "Tamil",
    "Bengali",
    "Telugu",
    "Gujarati",
    "Gurmukhi",
    "Kannada",
    "Malayalam",
    "Sinhala",
    "Khmer",
    "Lao",
    "Burmese",
    "Japanese",
    "Korean",
    "Chinese Simplified",
    "Chinese Hongkong"
]

const LANGUAGE_CHOICE_VALUES = LANGUAGE_CHOICES.map(lang => lang.replace(" ", "-").toLowerCase())

const DEFAULT_LANGUAGE_FILTER_VALUE = LANGUAGE_CHOICE_VALUES[0]

const getFilterLanguageFromParam = (sParams) => {
    let filterLanguage = sParams.get('subset')
    if (!filterLanguage) {
        return [ DEFAULT_LANGUAGE_FILTER_VALUE, true]
    }
    if (!LANGUAGE_CHOICE_VALUES.find(lang => (lang) === filterLanguage)) {
        return [filterLanguage = DEFAULT_LANGUAGE_FILTER_VALUE, false ]
    }
    return [ filterLanguage, true]
}

export default LANGUAGE_CHOICES
export { getFilterLanguageFromParam, LANGUAGE_CHOICES, LANGUAGE_CHOICE_VALUES, DEFAULT_LANGUAGE_FILTER_VALUE }
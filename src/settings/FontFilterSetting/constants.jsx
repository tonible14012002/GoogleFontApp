
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


const CATEGORY_CHOICES = ['Sans serif', 'Serif', 'Display', 'Handwriting', 'Monospace']
const CATEGORY_CHOICES_VALUES = CATEGORY_CHOICES.map(cate => cate.replace(" ", "-").toLowerCase())


export {
    LANGUAGE_CHOICES,
    LANGUAGE_CHOICE_VALUES,
    DEFAULT_LANGUAGE_FILTER_VALUE,
    CATEGORY_CHOICES, 
    CATEGORY_CHOICES_VALUES
}
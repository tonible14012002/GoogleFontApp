const BASE_URL = "https://fonts.googleapis.com/css?family="
const BASE_URL_V2 = "https://fonts.googleapis.com/css2?"
const MAX_URL_LENGTH = 2048

const numToFontWeightName = {
    "100": "Thin",
    "200": "Extra Light",
    "300": "Light",
    "400": "Regular",
    "500": "Medium",
    "600": "semibold",
    "700": "Bold",
    "800": "Extra Bold",
    "900": "Black",
    "regular": "Regular"
}

const extractVariantInfo = (variant) => {
    const fontStyle = variant.includes("italic")? "italic": ""
    let fontWeight = fontStyle ? variant.replace("italic", "") : variant
    if (fontWeight === "regular"
        || fontWeight === "")
    {
        fontWeight = "400"
    }
    return {
        fontStyle,
        fontWeight: parseInt(fontWeight)
    }
}


const variantToStyleName = (variant) => {
    const fontStyleName = variant.includes("italic") ? "Italic": ""
    let fontWeightNum = fontStyleName ? variant.replace("italic", "") : variant

    return {
        fontWeightName: numToFontWeightName[fontWeightNum],
        fontStyleName
    }
}

const addPlusSigns = (familyName) => familyName.replace(/ /g, '+')

const googleStyleSheetUrlGenerator = (fonts) => {

    let currentIndex = 0
    const paramsList = []

    while (currentIndex < fonts.length) {

        let params = addPlusSigns(fonts[currentIndex].family)
        currentIndex++

        for (; currentIndex < fonts.length; currentIndex++) {
            const { family } = fonts[currentIndex]
            const plusAddedFamily = addPlusSigns(family)
            const nextParamsLength = params.length + plusAddedFamily.length + 1
            if (nextParamsLength > (MAX_URL_LENGTH - BASE_URL.length)) {
                // Max URL characters
                paramsList.push(params)
                break
            }
            params += '|' + plusAddedFamily
        }
        if (currentIndex >= fonts.length) {
            paramsList.push(params)
        }
    }
    return paramsList 
}

const createStyleURLFromCollection = (collection) => {
    let params = []

    for (let family in collection){
        const familyPrefix = "family=" + addPlusSigns(family)
        const hasItalic = collection[family]["variants"].reduce((checkedVariant, variant) => {
            return checkedVariant || variant.includes("italic")
        }, false)

        let familyParams
        const prefix = hasItalic ? ":ital,wght@" : ":wght@"

        const styleOptions = collection[family]["variants"].map(variant => {
            const{ fontWeight, fontStyle } = extractVariantInfo(variant)
            return (
                hasItalic
                ? [fontStyle ? 1: 0 , fontWeight]
                : [ fontWeight ]
            )
        })
        styleOptions.sort((op, nextOp) => {
            if (hasItalic) {
                return (
                    op[0] === nextOp[0]
                    ? op[1] - nextOp[1]
                    : op[0] - op[1]
                )
            }
            else {
                return parseInt(op[1]) - parseInt(nextOp[1])
            }
        })

        familyParams =  familyPrefix + prefix + styleOptions.map(op => op.join(",")).join(";")
        params.push(familyParams)
    }
    console.log( BASE_URL_V2 + params.join("&"))
    return BASE_URL_V2 + params.join("&")
}

export { 
    addPlusSigns,
    googleStyleSheetUrlGenerator,
    extractVariantInfo,
    numToFontWeightName,
    variantToStyleName,
    createStyleURLFromCollection
}
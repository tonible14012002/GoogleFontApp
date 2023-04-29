


const addPlusSigns = (familyName) => familyName.replace(/ /g, '+')

const BASE = "https://fonts.googleapis.com/css?family="
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
            if (nextParamsLength > (2048 - BASE.length)) { // Max URL characters
                paramsList.push(params)
                break
            }
            params += '|' + plusAddedFamily
        }

    }
    return paramsList 
}

export { addPlusSigns, googleStyleSheetUrlGenerator }
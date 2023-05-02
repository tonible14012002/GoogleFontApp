


const addPlusSigns = (familyName) => familyName.replace(/ /g, '+')

const BASE = "https://fonts.googleapis.com/css?family="
const googleStyleSheetUrlGenerator = (fonts) => {

    let currentIndex = 0
    const paramsList = []

    console.log(fonts.length)
    while (currentIndex < fonts.length) {
        console.log('current index', currentIndex)

        let params = addPlusSigns(fonts[currentIndex].family)
        currentIndex++

        for (; currentIndex < fonts.length; currentIndex++) {
            const { family } = fonts[currentIndex]
            const plusAddedFamily = addPlusSigns(family)
            const nextParamsLength = params.length + plusAddedFamily.length + 1
            if (nextParamsLength > (2048 - BASE.length)) {
                // Max URL characters
                console.log(currentIndex, 'over max character => push to params list ')
                paramsList.push(params)
                break
            }
            params += '|' + plusAddedFamily
        }
        if (currentIndex >= fonts.length) {
            paramsList.push(params)
        }
    }
    console.log(paramsList)
    return paramsList 
}

export { addPlusSigns, googleStyleSheetUrlGenerator }
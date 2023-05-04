import { extractVariantInfo } from "../../utils"



const fontCollectionReducer = (collection, action) => {

    switch (action.type) {
        case "toggle": {
            const { family, variant, category } = action.data

            if (family in collection) {
                if (collection[family]["variants"].includes(variant)) {
                    collection[family]["variants"] = collection[family]["variants"].filter(v => v !== variant)
                    if (!collection[family]["variants"].length) {
                        delete collection[family]
                    }
                }
                else {
                    collection[family]["variants"].push(variant)
                    collection[family]["variants"].sort((lVariant, rVariant) => {
                        const { fontWeight: leftFontWeight, fontStyle: leftFontStyle } = extractVariantInfo(lVariant)
                        const { fontWeight: rightFontWeight } = extractVariantInfo(rVariant)
                        if (leftFontWeight === rightFontWeight)
                            return leftFontStyle ? 1 : 0
                        return leftFontWeight - rightFontWeight
                    })
                    console.log(collection[family]["variants"])
                }
                const newCollection = JSON.parse(JSON.stringify(collection))
                return newCollection
            }

            collection[family] = {
                variants: [variant],
                category
            }
            console.log({...collection})
            return {...collection}
        }
        default:
            return {}
    }
}

export default fontCollectionReducer
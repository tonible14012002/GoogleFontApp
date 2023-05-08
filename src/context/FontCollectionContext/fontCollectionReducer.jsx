const fontCollectionReducer = (collection, action) => {
  switch (action.type) {
    case 'toggle': {
      const { family, variant, category, file } = action.data

      if (family in collection) {
        if (variant in collection[family]['variants']) {
          delete collection[family]['variants'][variant]

          if (!Object.keys(collection[family]['variants']).length) {
            delete collection[family]
          }
        } else {
          collection[family]['variants'][variant] = file
        }
        const newCollection = JSON.parse(JSON.stringify(collection))
        return newCollection
      }

      const variants = {}
      variants[variant] = file
      collection[family] = {
        variants,
        category
      }
      return { ...collection }
    }
    default:
      return {}
  }
}

export default fontCollectionReducer

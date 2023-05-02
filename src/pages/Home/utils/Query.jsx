
const getQueryFromParam = (searchParam) => {
    let queryString = searchParam.get("query") || ""
    return [ queryString ]
}

export { getQueryFromParam }
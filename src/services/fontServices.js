import axios from "axios"
import API_KEY from "../credentials"

const getFonts = async () => {

    return axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`)
    .then(result => result.data)
    .catch(error =>  {
        console.log(error)
    })
}

const getFontDetail = async (params) => {
    return axios.get(`https://fonts.googleapis.com/css2?${params}`)
    .then(result => result.data)
}

export { getFonts }
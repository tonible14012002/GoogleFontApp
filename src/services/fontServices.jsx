import axios from 'axios'
import API_KEY from '../credentials'

const getFonts = async () => {
  return axios
    .get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`)
    .then((result) => ({
      status: 'ok',
      data: result.data
    }))
    .catch((error) => ({
      status: 'error',
      error: error.data
    }))
}

const getFontVariantFile = async (fileUrl) => {
  return axios
    .get(fileUrl, { responseType: 'blob' })
    .then((result) => ({
      status: 'ok',
      data: result.data
    }))
    .catch((error) => ({
      status: 'error',
      error: error.data
    }))
}

export { getFonts, getFontVariantFile }

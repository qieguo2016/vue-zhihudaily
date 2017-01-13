import axios from 'axios'

const defaults = {
  baseURL: '/api/4',
  transformResponse: [(data) => {
    return JSON.parse(replaceImageUrl(data))
  }]
}

Object.assign(axios.defaults, defaults)

export const fetchLatest = () => {
  return axios.get('/news/latest')
}

export const fetchBefore = (date) => {
  return axios.get(`/news/before/${date}`)
}

export const fetchDetail = (id) => {
  return axios.get(`/news/${id}`)
}

function replaceImageUrl (str) {
  let reg = /https?:(\\?\/){2}(pic\d*\.zhimg\.com\\?\/)/g
  return str.replace(reg, 'https://images.weserv.nl/?url=$2')
}

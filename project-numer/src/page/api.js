import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4444/api',
})

export const insertfunction = payload => api.post(`/functions`, payload)
export const getMethod = () => api.get(`/functions`)
export const getArray = () => api.get(`/linears`)
export const getDiff = () => api.get(`/diffs`)
export const getIntegrate = () => api.get(`/integrates`)
export const getIterpolation = () => api.get(`/iterpolations`)
export const getLeastsquare = () => api.get(`/leastsquares`)
export const getArrays = () => api.get(`/iteratives`)


const apis = {
    insertfunction,
    getMethod,
    getArray,
    getDiff,
    getIntegrate,
    getIterpolation,
    getLeastsquare,
    getArrays

}

export default apis
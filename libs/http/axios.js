import axios from  'axios'
import { Http } from './http.js'

export class Axios extends Http {

    constructor() {
        super('axios')
    }

    async get(url,queryParams) {
        return axios.get(`${url}?${this.serialize(queryParams)}`)
    }

    async post(url, queryParams, data) {
        return axios.post(`${url}?${this.serialize(queryParams)}`, data)
    }

}
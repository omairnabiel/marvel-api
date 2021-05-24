import { getHash } from "../../utils/hash.js"
import axios from "axios"

export class Http {
    #defaultQueryParams
    constructor() {
        this.#defaultQueryParams =
        {
           apikey: process.env.PUBLIC_MARVEL_API_KEY, 
           ts: process.env.TS,
           hash: getHash() 
       }
    }
     
    async get(url,queryParams) {
        return axios.get(`${url}?${this.#serialize(queryParams)}`)
    }

    async post(url, queryParams, data) {
        return axios.post(`${url}?${this.#serialize(queryParams)}`, data)
    }

    
    #serialize(params) {
        let mergedParams = params ?  {...params, ...this.#defaultQueryParams} :  { ...this.#defaultQueryParams}
        const str = [];
        for (var key in mergedParams)
            if (mergedParams.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(mergedParams[key]));
            }
        return str.join("&");
       }
}
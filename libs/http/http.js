import { getHash } from "../../utils/hash.js"

export class Http {
    defaultQueryParams
    constructor() {
        this.defaultQueryParams =
        {
           apikey: process.env.PUBLIC_MARVEL_API_KEY, 
           ts: process.env.TS,
           hash: getHash() 
       }
    }
        
    
    serialize(params) {
        let mergedParams = params ?  {...params, ...this.defaultQueryParams} :  { ...this.defaultQueryParams}
        const str = [];
        for (var key in mergedParams)
            if (mergedParams.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(mergedParams[key]));
            }
        return str.join("&");
       }
}
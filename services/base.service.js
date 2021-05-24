import { BASE_URL } from "../config.js"
import { Cache } from "../libs/cache/index.js"
import { Http } from "../libs/http/index.js"

export class BaseService {
    http
    cache
    baseUrl
    
    // base constructor with default params
    constructor(http = new Http() , cache = new Cache(), baseUrl = BASE_URL) {

        // throw error for new BaseService() as it's an abstract class
        if(new.target === BaseService) throw new Error("Cannot create object of an abstract class")

        this.http = http
        this.cache = cache
        this.baseUrl = baseUrl
    }
}
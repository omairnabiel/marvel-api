import { BASE_URL } from "../config.js"
import { CacheFactory } from "../libs/cache/cache_factory.js"
import { HttpFactory } from "../libs/http/http_factory.js"

export class BaseService {
    http
    cache
    baseUrl

    constructor(http, cache, baseUrl) {
        // throw error for new BaseService() as it's an abstract class
        if(new.target === BaseService) throw new Error("Cannot create object of an abstract class")

        this.cache = new CacheFactory(cache || 'local')
        this.http = new HttpFactory(http || 'axios')
        this.baseUrl = baseUrl || BASE_URL
    }
}
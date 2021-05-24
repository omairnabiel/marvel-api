import { Local } from "./engines/local.js"
import { Redis } from "./engines/redis.js";

let cache = null

export class CacheFactory {
    constructor(engine) {
        if(!cache) {  // singleton instance
            switch(engine){
                case "local":
                    cache = new Local()
                    break;
                case "redis":
                    cache = new Redis();
                    break;
                default:
                    cache = new Local()
            }
        }
        return cache
    }
}
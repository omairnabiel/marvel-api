import { Local } from "./engines/local.js"

let cache = null

export class Cache {
    constructor() {
        if(!cache) {  // singleton instance
            cache = new Local()
        }
        return cache
    }
}
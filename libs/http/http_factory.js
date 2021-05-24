import { Axios } from './axios.js';

let http = null

export class HttpFactory {
    constructor(module) {
        if(!http) { // singleton instance
            switch(module) {
                case 'axios':
                  return http = new Axios();
                default:
                    return http = new Axios();
            }   
        }
        return http   
    }
}

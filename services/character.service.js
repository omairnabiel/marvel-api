import { ALL_CHARACTERS_CACHE_KEY } from '../config.js'
import { ApiError } from '../utils/api_error.js'
import { BaseService } from './base.service.js'

export class CharacterService extends BaseService {
    constructor(http, cache, baseUrl) {
        super(http, cache, baseUrl)
    }

    /**
     * getAllCharacters returns all characters from Marvel api
     */
    async getAllCharacters() {
        if(!this.cache.get(ALL_CHARACTERS_CACHE_KEY)) {
            await this.syncCharacters()
        }
        return this.cache.get(ALL_CHARACTERS_CACHE_KEY)
    }

    /**
     * getCharacterById returns a single character of the given id
     * @param {number} id 
     */
    async getCharacterById(id){
        try {
            const character = await this.http.get(`${this.baseUrl}/characters/${id}`)
 
            const { id: characterId, name, description } = character.data.data.results[0]
            return {
                id: characterId,
                name,
                description
            }

        } catch (error) {
            throw new ApiError(error) 
        }
    }

    /**
     * syncCharacters fetches all characters from Marvel api and puts them into the cache.
     */
    async syncCharacters() {
        let limit = 100, offset = 0, data;
        try {
            const character = await this.http.get(`${this.baseUrl}/characters`,{limit,offset})
            const { total, results } = character.data.data
            data = results.map(character => character.id)

            // calculate the amount of subsequent calls to be made to get all character
            const remaining = total - limit 
            const subsequentCallsToMake = Math.ceil(remaining/100)

            // make the remaining subsequent calls in Parallel using Promise.all([])
            const promises = []
            for(let i = 0; i < subsequentCallsToMake ; i++) {
                offset += 100
                promises.push(this.http.get(`${this.baseUrl}/characters`,{limit,offset})) 
            }
            
            const allCharacters = await Promise.all(promises)
            allCharacters.forEach(resolved => {
                resolved.data.data.results.forEach(character => {
                    data.push(character.id)
                })
            })

            this.cache.set(ALL_CHARACTERS_CACHE_KEY, data)
            return data
            
        } catch (error) {
            throw new ApiError(error) 
        } 
    }
}


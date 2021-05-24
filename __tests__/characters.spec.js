
/**
 * Our testing uses `Mocked Service Workers` using "msw" package, which intercepts all http calls to marvel and returns the
 * desired response. Using this technique we don't need to mock low level libraries like axios, fetch etc.
 */
import { jest } from "@jest/globals"
import request from "supertest"
import { rest } from "msw"
import { setupServer } from "msw/node"

import app from "../app.js"
import { ALL_CHARACTERS_CACHE_KEY, BASE_URL } from "../config.js"
import { CharacterService } from "../services/character.service.js"


const server = setupServer(
    rest.get(`${BASE_URL}`,(req,res,ctx) => res(ctx.status(200)))
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe("GET /characters/:id", () => {
   
    it("should return the character successfully", async()=> {
        const mockCharacter = { id: 1, description: "It's the Iron Man", name: "Iron Man" } 
        
        server.use(
            rest.get(`${BASE_URL}/characters/1`,(req,res,ctx) => {
                return res(ctx.json({
                    data: {
                        results: [mockCharacter]
                    }
                }))
            })
        )

        const response = await request(app).get('/characters/1').send()
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCharacter);
        
    })

    it("should send status 404 if Marvel api sends 404 (character not found)", async()=> {
        
        server.use(
            rest.get(`${BASE_URL}/characters/1`,(req,res,ctx) => {
                return res(ctx.status(404))
            })
        )
        const response = await request(app).get('/characters/1').send()
        expect(response.status).toBe(404);
    })
})



describe("Character Service", ()=> {
    
    describe("Cache testing", ()=> {
        
        it("should not call syncCharacters if cache already has the data", async()=> {
            // initializing service with data in cache
            const service = new CharacterService(null,new Map().set(ALL_CHARACTERS_CACHE_KEY,{}))
    
            const syncCharactersSpy = jest.spyOn(service,'syncCharacters')
            await service.getAllCharacters()
            expect(syncCharactersSpy).not.toHaveBeenCalled()
        });
    
        it("should call syncCharacters if cache is empty", async()=> {
            // intializing service with empty cache
            const service = new CharacterService()
    
            const syncCharactersSpy = jest.spyOn(service,'syncCharacters').mockImplementationOnce(()=> {})
            await service.getAllCharacters()
            expect(syncCharactersSpy).toHaveBeenCalled()
        })
    })

})

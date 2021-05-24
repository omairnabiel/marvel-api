import express from 'express'

import { BASE_URL } from "../config.js"
import { HttpFactory } from "../libs/http/http_factory.js"
import { CacheFactory }  from "../libs/cache/cache_factory.js"
import { CharacterService } from "../services/character.service.js"
import { requestHandler } from '../utils/request_handler.js'

const router = express.Router()
const http = new HttpFactory('axios')
const cache = new CacheFactory('local')

// create a CharacterService instance with dependencies injected
const characterService = new CharacterService(http, cache, BASE_URL)


router.get("/characters", requestHandler(async(req,res) => {
  const characters = await characterService.getAllCharacters()
  res.json(characters)
}))

router.get("/characters/:id", requestHandler(async(req,res) => {
   const { id } = req.params
   res.json(await characterService.getCharacterById(id))
     
}))


export default router

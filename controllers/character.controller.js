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


 /**
  * @swagger
  * tags:
  *   name: Characters
  *   description: The characters managing API
  */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Returns the list all character ids 
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: The list of id's of the characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 */
router.get("/characters", requestHandler(async(req,res) => {
  const characters = await characterService.getAllCharacters()
  res.json(characters)
}))


/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get the character by id
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The character id
 *     responses:
 *       200:
 *         description: The character description by id
 *         contens:
 *           application/json:
 *             schema:
 *              Character:
 *                type: object
 *                required:
 *                  - id
 *                  - name
 *                  - description
 *       404:
 *         description: The character was not found
 */
router.get("/characters/:id", requestHandler(async(req,res) => {
   const { id } = req.params
   res.json(await characterService.getCharacterById(id))
     
}))


export default router

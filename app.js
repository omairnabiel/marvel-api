
import "./env.js"

import express from "express"
import cors from "cors"
import nodeCron from "node-cron"

import CharacterController from "./controllers/character.controller.js"
import { CharacterService } from "./services/character.service.js"
import { errorHandlerMiddleware } from './middlewares/error_handler.js'


const app = express()

const PORT = process.env.PORT || 8080

app.use(cors())

app.use("/", CharacterController)

 
// cron job to update cache every 12 hours
nodeCron.schedule(' 0 0 */12 * * *', async function(){
    const service = new CharacterService()
    await service.syncCharacters()
    console.log("Cache Resetted at", new Date());
})

app.use(errorHandlerMiddleware)

app.listen(PORT,() => {
    console.log(`Node server running on localhost:${PORT}`)
})
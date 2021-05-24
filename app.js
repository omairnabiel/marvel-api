
import "./env.js"

import express from "express"
import cors from "cors"
import nodeCron from "node-cron"
import { serve, setup } from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

import CharacterController from "./controllers/character.controller.js"
import { CharacterService } from "./services/character.service.js"
import { errorHandlerMiddleware } from './middlewares/error_handler.js'
import { options } from "./docs/swagger.js"

const app = express()

app.use(cors())

// setup swagger api docs'
const specs = await swaggerJsDoc(options)
app.use('/api-docs', serve, setup(specs))

app.use("/", CharacterController)

 
// cron job to update cache every 12 hours
nodeCron.schedule(' 0 0 */12 * * *', async function(){
    const service = new CharacterService()
    await service.syncCharacters()
    console.log("Cache Resetted at", new Date());
})

app.use(errorHandlerMiddleware)

export default app


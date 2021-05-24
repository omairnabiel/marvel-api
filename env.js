import dotenv from "dotenv" 

const env = dotenv.config({silent: true})
if(env.error) {   // exit node process if ".env" isn't loaded
    throw env.error
}


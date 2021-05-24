import app from "./app.js"

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`Node server running on localhost:${PORT}`)
})
# Marvel API Integration

### Endpoints

The API should support the following requests:

#### `GET /characters`
#### `GET /characters/:id`

### API Documentation
For Swagger Documentation:
#### `http://localhost:8080/api-docs`

### How to run
Make sure node is installed on your PC. This App is built with Node version (14.6.1)

Take clone of this repo on your local machine

First install all the dependencies with the following command

`- npm install`

In order to run the app first you need to have `.env` file. Make sure to download it and place it in the
root folder of this app (along side package.json)

To start the server run the following command
`- node ./app.js` 

  OR to run in dev environment with nodemon, use the following

`- npm run dev`

The server runs on localhost:8080
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const schema = require('./data/schema')
const jwt = require('express-jwt')
require('dotenv').config()


// create our express app
const app = express()
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

const PORT = 3000

// graphql endpoint
app.use(
  '/api',
  bodyParser.json(),
  auth,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  }))
)


app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/api`)
})
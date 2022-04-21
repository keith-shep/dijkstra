const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const getShortestPathModules = require('./getShortestPath')
const sendMessage = require('./twilio')
// const { response } = require('express')

// Middleware
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// Static page from React build
// app.use('/', express.static('../frontend/build/'))


// Serve API
app.post('/api', (request, response) => {
  const { route, origin, destination } = request.body
  const [nodes, edges] = getShortestPathModules.parseInput(route)
  const list = getShortestPathModules.buildAdjacencyList(nodes, edges)
  const [distance, path] = getShortestPathModules.getShortestPath(
    list,
    origin,
    destination,
    nodes
  )
  const obj = { distance: distance, path: path }
  response.json(obj)
})

// Twilio API
app.post('/twilio', (request, response) => {
  const { path, distance, number } = request.body
  const origin = path[0]
  const destination = path[path.length - 1]
  const message = `The shortest path from ${origin} to ${destination} is ${path}. Distance: ${distance}`
  sendMessage(number, message)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

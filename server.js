const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')



// Initialize app
const app = express()

// Parser for POST data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Set Routes
const routes = requireDir('./routes')
for(var i in routes) {
	app.use('/', routes[i])
}

// Set port
const port = process.env.PORT || '3002'
app.set('port', port)


// Create http server
const server = http.createServer(app)

// Listen for traffic
server.listen(port, () => console.log(`App running on port: ${port}`))


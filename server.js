const express = require('express');

const server = express();

server.use(express.json());

const projectRoute = require('./projectRoutes');
const actionRoute = require('./actionRoutes');

server.use('/apip/actions', actionRoute);
server.use('/api/projects', projectRoute);
//Test its running

server.get('/', (req, res) => {
    res.status(200).json("Successful Deployment")
})

server.use(errorHandler);

//Logger middleware
function logger(req, res, next) {
    console.log(`${req.method} to ${req.path} at ${new Date().toISOString()}`)
    next()
};

server.use(logger);

function errorHandler(err, req, res, next) {
    console.log(err)
}


module.exports = server;

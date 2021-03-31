const express = require("express");
const carsRouter = require('./cars/cars-router.js');
const server = express();
const helmet = require('helmet')

// DO YOUR MAGIC
//server.use(helmet())

server.use(express.json());
server.use('/api/cars', carsRouter);

module.exports = server

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

// setup middleware
server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());

function logger(req, res, next){
  console.log(`${req.method} to ${req.path} from ${req.url} ${Date.now() / 1000}`);

  next();
}

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>I'ts working !!!</h2>`)
});

module.exports = server;

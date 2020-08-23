const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    users.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error creating the post"
        })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const id = req.params.id;
    users.getById(id)
    .then(post => {
        res.status(201).json(post)
        posts.insert(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "NOT a valid user ID"
        })
    })
});

router.get('/', (req, res) => {
    users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            errorMessage: "Error retrieving users."
        })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    users.getById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error getting post"
        })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;
    users.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error getting posts"
        })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    users.remove(id)
    .then(user => {
        res.status(200).json({
            message: "User has been removed"
        })
    })
});

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    users.update(id, changes)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "User could NOT be updated"
        })
    })
});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    if(!id){
        res.status(400).json()
    }

    next();
};

function validateUser(req, res, next) {
        if(!req.body.name){
            res.status(400).json({
                message: "missing required name field"
        })
    } 

    next();
};

function validatePost(req, res, next) {
    if(!req.body){
        res.status(400).json({
            message: "missing post data"
        })
    } else if(!req.body.text){
        res.status(400).json({
            message: "missing text field"
        })
    } else {
        next();
    }
};

module.exports = router;

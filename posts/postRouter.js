const express = require('express');
const helmet = require('helmet');

const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    posts.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error getting posts"
        })
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    posts.getById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error invaild post ID"
        })
    })
});

router.delete('/:id', validatePostId,  (req, res) => {
    const id = req.params.id;
    posts.remove(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error deleting post"
        })
    })
});

router.put('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    posts.update(id, changes)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "Error updating post"
        })
    })

});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;
    if(id){
        next();
    } else {
        res.status(400).json({
            message: "NOT a valid user post ID"
        })
    }
};

module.exports = router;
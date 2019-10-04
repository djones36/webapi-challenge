const express = require('express');
const Actions = require('./data/helpers/actionModel');
const router = express.Router();

//Get

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        }).catch(err => {
            res.status(500).json({ message: "failed to load actions", err: err)
        })
})
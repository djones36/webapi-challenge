const express = require('express');
const Actions = require('./data/helpers/actionModel');
const router = express.Router();

//Get all actions

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        }).catch(err => {
            res.status(500).json({
                message: "failed to load actions", err: err
            })
        })
})
//Get actions by ID 

router.get('/:id', validateActionId, (req, res) => {
    const id = req.params.id
    Actions.get(id)
        .then(actionID => {
            res.status(200).json(actionID)
        }).catch(err => {
            res.status(500).json({ message: "failed to load action by id", err: err })
        })
})


//middleware

function validateActionId(req, res, next) {
    const id = req.params.id
    Actions.get(id)
        .then(actionId => {
            if (actionId) {
                req.action = actionId
                next()
            }
            else res.status(400).json({ message: 'error wrong action ID!' })
        }).catch(err => {
            res.status(500).json(err)
        })
}

module.exports = router;
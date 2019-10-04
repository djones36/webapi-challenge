const express = require('express');
const Actions = require('./data/helpers/actionModel');
const Project = require('./data/helpers/projectModel')
const router = express.Router();

//Get "all actions"

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
//Get "actions by ID"

router.get('/:id', validateActionId, (req, res) => {
    const id = req.params.id
    Actions.get(id)
        .then(actionID => {
            res.status(200).json(actionID)
        }).catch(err => {
            res.status(500).json({ message: "failed to load action by id", err: err })
        })
})

//Post new action

router.post('/', validatActions, (req, res) => {
    const action = req.body;
    Actions.insert(action)
        .then(newAction => {
            res.status(201).json(newAction)
        }).catch(err => {
            res.status(500).json({ error: "An error creating action" })
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

function validatActions(req, res, next) {
    const action = req.body;

    if (!action) {
        res.status(404).json({ message: "requires action data" })
    }
    else if (!action.description || !action.notes || !action.project_id) { res.status(404).json({ message: "missing action notes, description, and project_id" }) }

    else if (action && action.description && action.notes && action.project_id) {
        Project.get(action.project_id)
            .then(proceed => {
                if (proceed) {
                    next()
                }
                else {
                    res.status(400).json({ message: "invalid project id" })
                }
            })
            .catch(err => res.status(500).json({ message: "error validating project id" }))
    }
}

module.exports = router;
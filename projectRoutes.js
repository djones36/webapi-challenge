const express = require('express');

const Project = require('./data/helpers/projectModel');

const router = express.Router();

//GET//

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        }).catch(err => {
            res.status(500).json({ error: " Failed to get projects" })
        })
})

//Get by id
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json({ user: req.project })
});
//middleware
function validateProjectId(req, res, next) {
    const id = req.params.id
    Project.get(id)
        .then(projectId => {
            if (projectId) {
                req.project = projectId
                next()
            }
            else res.status(400).json({ message: 'error wrong project ID!' })
        }).catch(err => {
            res.status(500).json(err)
        })
}


module.exports = router;
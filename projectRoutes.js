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

//Get only actions of a project

router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;
    Project.getProjectActions(id)
        .then(projectAction => {
            res.status(200).json(projectAction)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Post

router.post('/', validatProject, (req, res) => {
    const projects = req.body;
    Project.insert(projects)
        .then(newProjects => {
            res.status(201).json(newProjects)
        }).catch(err => {
            res.status(500).json({ error: "An error creating project" })
        })
})

//Put

router.put('/:id', validateProjectId, (req, res) => {
    const id = req.params.id
    const update = req.body

    Project.update(id, update).then(updatedProject => {
        res.status(200).json(updatedProject)
    }).catch(err => {
        res.status(500).json({ message: "failed to update", error: err })
    })
})

//Delete



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

function validatProject(req, res, next) {
    const projects = req.body;

    if (!projects.name || !projects.description) {
        return res.status(400).json({ errorMessage: "A name and a description is required" })
    } else next()

}

module.exports = router;
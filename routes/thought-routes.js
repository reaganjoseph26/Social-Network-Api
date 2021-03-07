const router = require('express').Router();

const { addThought, getThoughts, getThoughtsById, updateThought, deleteThought} = require('../controllers/thought-controller')

router
.route('/')
.get(getThoughts)
.post(addThought);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought);


router
.route('/:userId/:thoughtId')


module.exports = router;

const router = require('express').Router();

const {getAllUsers, createUser, deleteUser, getUserById} = require('../controllers/user-controller')

router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:id')
.get(getUserById)
.delete(deleteUser)

module.exports = router;
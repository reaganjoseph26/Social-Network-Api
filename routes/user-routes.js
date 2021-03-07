const router = require('express').Router();

const {getAllUsers, createUser, deleteUser, getUserById, updateUser, createFriend, deleteFriend} = require('../controllers/user-controller')

router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:id')
.get(getUserById)
.delete(deleteUser)
.put(updateUser)

router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend)

module.exports = router;
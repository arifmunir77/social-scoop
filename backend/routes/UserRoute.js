import express from 'express'
import { UserDummy, deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser } from '../controllers/UserController.js'
// import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()

router.get('/:id', getUser);
router.get('/',UserDummy)
// router.get('/',getAllUsers)
router.get('/getAllUser',getAllUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)

export default router
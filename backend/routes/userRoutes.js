import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUserById, getUserById, updateUser} from '../controllers/userController.js'


router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.route('/:id').delete(protect, admin, deleteUserById).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router
import express from 'express';
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser,getUserById,updateUser} from '../controllers/userController.js';
import { protect, admin } from '../../middleWare/authMiddleWare.js'; 


const router = express.Router();

router.get('/', protect, admin, getUsers)
router.post('/', registerUser)
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser)
router.route('/:id').get(protect, admin,getUserById).put(protect, admin,updateUser)


export default router;
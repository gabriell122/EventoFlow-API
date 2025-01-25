const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile/:id/:token', getUserProfile);
module.exports = {userRouter};
const express = require('express');
   const { enrollInEvent, cancelEnrollment, getEnrollments } = require('../controllers/enrollmentController');
   const enrollmentRouter = express.Router();

   enrollmentRouter.post('/', enrollInEvent);
   enrollmentRouter.delete('/:id', cancelEnrollment);
   enrollmentRouter.get('/user/:userId', getEnrollments);

   module.exports = {enrollmentRouter};
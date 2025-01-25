const express = require('express');
const { createEvent, getEvents, getEventDetails, updateEvent, deleteEvent } = require('../controllers/eventController');
const eventRouter = express.Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:id', getEventDetails);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);

module.exports = {eventRouter};
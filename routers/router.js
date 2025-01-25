const { eventRouter } = require("./eventRouter");
const { userRouter } = require("./userRouter");
const { enrollmentRouter } = require("./enrollmentRouter")
const express = require('express');
const router = express.Router();
router.use( "/user", userRouter );
router.use( "/event", eventRouter );
router.use( "/enrollment", enrollmentRouter);
module.exports = router;

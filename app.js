const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const router = require("./routers/router.js")
app.use(router)


module.exports = app;


require("dotenv").config({path: "./.env"});

const express = require("express");
const app = express();
// logger
const logger = require("morgan");
app.use(logger("tiny"));

// routes
app.use("/", require("./routes/indexRoutes"));

// error handling
const errorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.all("*", (req, res, next) => {
    next(new errorHandler(`Requested URL Not Found ${req.url}`, 404))
});
app.use(generatedErrors);


app.listen(
    process.env.PORT, console.log(`server running on port ${process.env.PORT}`));
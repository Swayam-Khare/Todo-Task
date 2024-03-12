const cors = require("cors");
const express = require("express");
const taskRoute = require("./routers/taskRouter");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./utils/globalErrorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", taskRoute);
app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "Failed",
  //     message: `Can't find ${req.originalUrl} on the server!`,
  //   });

  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;

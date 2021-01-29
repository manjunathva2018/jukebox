require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/mongoDBConfig");
const colors = require("./helpers/colors");
const AppError = require("./helpers/appError");
const errorHandler = require("./middlewares/errorHandler");
// const path = require("path");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("common"));
}
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// api routes
app.use("/api/musicalbum", require("./components/music-album/musicAlbumRoute"));
app.use("/api/musician", require("./components/musician/musicianRoute"));

app.all("/api/*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

app.use(errorHandler);

const port = process.env.NODE_PORT || 2000;

const server = app.listen(port, function () {
  console.log(colors.yellow, `Server started at port : ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  console.warn(colors.blue, "Unhandled rejection!");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  console.warn(colors.cyan, "Uncaught exception, catch the errors!");
  process.exit(1);
});

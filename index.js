require("dotenv").config();
require("./config/mongoDBConfig");
const app = require("./app");
const colors = require("./helpers/colors");

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

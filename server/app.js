import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import subNumberRouter from "./controllers/subNumbers/_routes.js";
import userRouter from "./controllers/user/_routes.js";
import { connectDb } from "./db/connectDb.js";
import { fileURLToPath } from "url";
import cors from "cors";

connectDb();

// var indexRouter = require("./controllers/index");
// var usersRouter = require("./controllers/users");

var app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/SubNumber", subNumberRouter);
app.use("/User", userRouter);

// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("running");
});

export { app };

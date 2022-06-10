import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";


import indexRouter from "./routes";
import inscriptionRouter from "./routes/inscription";
import adminRouter from "./routes/admin";
import loginRouter from "./routes/login";

const app = express();

// view engine setup
app.set("views", path.join("./", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./", "public")));

// routes

app.use("/", indexRouter);
app.use("/", inscriptionRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);

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


app.listen(3000,()=>{
    console.log(`listening to port 3000`);
})
export default app;


import path from "path";
import fs from "fs";

import express from "express";
import session from "express-session";
import logger from "morgan";

import indexRouter from "./routes";
import inscriptionRouter from "./routes/inscription";
import adminRouter from "./routes/admin";
import loginRouter from "./routes/login";

import { Storage } from "@google-cloud/storage";

const storage = new Storage();

const app = express();

// view engine setup
app.set("views", path.join("./", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join("./", "public")));

// authentification

app.use(
  session({
    secret: "RI_IS_DIFFUCT_MODULE",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Prod is supposed to use https
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      httpOnly: true,
      maxAge: 1000 * 60,
    },
  })
);

// routes
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use("/", indexRouter);
app.use("/", inscriptionRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

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
  console.log(`listening to port 3000`);
});

export async function uploadFile(filePath, name, type) {
  const folders = { image: "images", pdf: "images" };
  const extention = { image: ".png", pdf: ".pdf" };
  const root = "public/";

  if (process.env.DB_USER) {
    const bucket = storage.bucket("supernabil-86c2b.appspot.com");
    await bucket.upload(filePath, {
      public: true,
      destination: path.join("pfe", folders[type], name + extention[type]),
    });
    return;
  }
  const outpath = path.join(root, folders[type], name + extention[type]);

  fs.copyFileSync(filePath, outpath);
}

export function filePath(name, type) {
  const folders = { image: "images", pdf: "images" };
  const extention = { image: ".png", pdf: ".pdf" };
  if (process.env.DB_USER) {
    return `https://storage.googleapis.com/supernabil-86c2b.appspot.com/pfe/images/${name}.${extention[type]}`;
  }

  const root = "/";
  const outpath = path.join(root, folders[type], name + extention[type]);
  return outpath;
}

export default app;

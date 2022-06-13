import express from "express";
import { validateInfo } from "../models/admin";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const { name, password } = req.body;
    const user = await validateAuth(name, password);
    if (user !== false) {
        req.session.regenerate(() => {
            req.session.user = user;
            console.log(user);
            req.session.save(() => {
                res.redirect("/admin");
            });
        });
    } else {
        res.render("login");
    }
});

async function validateAuth(name, password) {
    console.log("hello world");
    const userId = await validateInfo(name, password);
    return userId;
}

export default router;

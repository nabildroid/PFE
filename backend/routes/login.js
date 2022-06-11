import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", (req, res) => {
    
    const { name, password } = req.body;
    const user = validateAuth(name, password);
    if (user) {
        req.session.regenerate(() => {
            req.session.user = true;
            req.session.save(() => {
                res.redirect("/admin");
            });
        });
    } else {
        res.render("login");
    }
});

function validateAuth(name, password) {
    return true;
}

export default router;

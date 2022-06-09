import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/:id", function (req, res, next) {
    const id = req.params.id;
    res.render("inscription", { title: id });
});

router.post("/:id", (req, res) => {
    const { name, fonction } = res.body;
    res.render("inscription");
});


export default router;

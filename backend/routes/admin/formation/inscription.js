const express = require("express");
const router = express.Router();



// get insciption
router.get("/:inId", (req, res) => {
});

// delete insciption
router.delete("/:inId", (req, res) => {

});

// set insciption group
router.post("/:inId", (req, res) => {
    const {group} = req.body;
});

// set insciption group
router.post("/:inId", (req, res) => {
    const {group} = req.body;
});




module.exports = router;

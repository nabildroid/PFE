const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    req.render("salles");
});

router.post("/",(req,res)=>{
  const {name} = req.body;

})


module.exports = router;
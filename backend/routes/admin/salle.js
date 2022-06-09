import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
    req.render("salles");
});

router.post("/",(req,res)=>{
  const {name} = req.body;

})


export default router;
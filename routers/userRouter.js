const express=require("express");
const { signupUser, loginUser, profileUser } = require("../controllers/userController");
const router=express.Router();

router.post("/postdata", signupUser);
router.post("/login", loginUser);
router.post("/profiledata",profileUser)

module.exports=router;
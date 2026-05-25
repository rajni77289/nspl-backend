const express=require("express");
const router=express.Router();
const {postStudent,getStudent,deleteStudent,postStudentup}=require("../controllers/studentController");


router.post("/studata",postStudent);
router.get("/allstudent",getStudent)
router.delete("/deletestudent/:id",deleteStudent);
router.post("/updatestudent/:id",postStudentup);


module.exports=router;
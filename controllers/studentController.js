const express = require("express");
const Student = require("../models/studentModel");
const fs = require("fs");

const postStudent = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const { date, category, state, firstname, lastname, fathername, roll_no, address, mobailno, course, email, courseduration, gender} = req.body;
        const createstuuser = new Student({
            firstname: firstname,
            lastname: lastname,
            fathername: fathername,
            // mothername: mothername,
            roll_no: roll_no,
            mobailno: mobailno,
            email: email,
            state: state,
            category: category,
            course: course,
            courseduration: courseduration,
            date: date,
            address: address,
            gender: gender,
            // image: {
            //     data: fs.readFileSync("uploads/" + req.file.filename),
            //     ContentType: "uploads/",
            // }
            image: req.file ?  {
                data: fs.readFileSync("uploads/" + req.file.filename),
                ContentType: "uploads/",
            }: null

        })

        // save data:
        const savestu = await createstuuser.save();
        if (savestu) {
            res
                .status(200)
                .json({ message: "success", status: true, user: savestu })
        }
        else {
            res.status(500).json({ message: "error", status: false })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error, message: "Error in student form" });

        // res.json({ error: error, message: "Error in student form" });
    }
}


//  =========  get All Students:-===================
const getStudent = async (req, res) => {
    try {
        const fetchStudent = await Student.find({});
        if (!fetchStudent) {
            res.status(200).json({ message: "failed  in fetch", status: false });
        }
        res
            .status(200)
            .json({ message: "Success", status: true, user: fetchStudent });
    }
    catch (error) {
        res.json({ error: error, message: "Error in Fetch Students" });
    }
}

const deleteStudent = async (req, res) => {
    console.log("delete", req.params);
    const id = req.params.id;
    const delStudent = await Student.deleteOne({ _id: id });
    console.log(delStudent);

}

// registation page:-
// app.post("/updatestudent"),async(req,res)=>{
// }

const postStudentup = async (req, res) => {

    const studentUpdate = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );
    res.json({ message: "success", user: studentUpdate })

}



module.exports = { postStudent, getStudent, deleteStudent, postStudentup };
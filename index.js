const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const multer = require("multer")
const fs = require('fs');
const { type } = require('os');
// const { buffer } = require('stream/consumers');
// const { error } = require('console');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })




main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://Rajni:Rajni77@cluster0.ux7cbp9.mongodb.net/?appName=Cluster0");
    console.log("Database Connected")

}

var corsOptions = {
    origin: ['https://nspl.vercel.app/', 'http://localhost:3000/'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// middlewheare:
app.use(express.json())
app.use(cors());


// Link router:----
// app.use("/api")  :- ye /signup ya koi nhi link ho agr khule to /signup se phle /api khulega ex(/api uske ba /signup);
app.use("", require("./routers/userRouter"));
// app.use("",require("./routers/studentRouter"));




//  ------------- student Register form---------
// user schema
const stuschema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    fathername: {
        type: String,
    },
    roll_no: {
        type: String,
    },
    address: {
        type: String,
    },
    course: {
        type: String,
    },
    courseduration: {
        type: String,
    },
    date: {
        type: String,
    },
    mobailno: {
        type: String,
    },
    email: {
        type: String,
    },
    state: {
        type: String,
    },
    category: {
        type: String,
    },
    gender: {
        type: String,
    },
    image: {
        data: Buffer,
        ContentType: String,
    },


})
// create model:
const Student = mongoose.model("student", stuschema);

app.post('/studata', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const { date, category, state, firstname, lastname, fathername, roll_no, address, mobailno, course, email, courseduration, gender, mothername } = req.body;

        const createstuuser = new Student({
            firstname: firstname,
            lastname: lastname,
            fathername: fathername,
            mothername: mothername,
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
            image: {
                data: fs.readFileSync("uploads/" + req.file.filename),
                ContentType: "uploads/",
            }

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
        res.json({ error: error, message: "Error in student form" });
    }
})


//  =========  get All Students:-===================
app.get("/studentgetdata", async (req, res) => {
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
})

app.delete("/deletestudent/:id", async (req, res) => {
    console.log("delete", req.params);
    const id = req.params.id;
    const delStudent = await Student.deleteOne({ _id: id });
    console.log(delStudent);
    //res.json({ message: "Success", status: true });

})

// registation page:-
// app.post("/updatestudent"),async(req,res)=>{

// }

app.post("/updatestudent/:id", async (req, res) => {

    const studentUpdate = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );
    res.json({ message: "success", user: studentUpdate })

})

// ======== create TechRegistation Form=====================
const techschema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    qualification: {
        type: String,
    },
    contact: {
        type: String,
    },
    age: {
        type: String,
    },
    subject: {
        type: String,
    },
    salary: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    experience: {
        type: String,
    },
    gender: {
        type: String,
    },
    date: {
        type: String,
    },
    // image: {
    //     data: Buffer,
    //     ContentType: String,
    // },
})
// create model:--
const Teacher = mongoose.model("Teacher", techschema);

app.post('/teacherdata', upload.single('image'), async (req, res) => {
    console.log(req.body);
    //console.log(req.file);


    try {


        const { fullname, qualification, contact, age, subject, salary, email, address, experience, gender, date } = req.body;

        const createteacher = new Teacher({
            fullname: fullname,
            qualification: qualification,
            contact: contact,
            age: age,
            subject: subject,
            salary: salary,
            email: email,
            address: address,
            experience: experience,
            gender: gender,
            // date: date,
            // image: {
            //     data: fs.readFileSync(req.file.path),
            //     ContentType: req.file.mimetype,
            // }
        })


        const saveteach = await createteacher.save();
        if (saveteach) {
            res
                .status(200)
                .json({ message: "success", status: true, user: saveteach })
        }
        else {
            res.status(500).json({ message: "error", status: false })
        }
    }
    catch (error) {
        res.json({ error: error, message: "Error in Teacher form" });
    }

})
//----------------- All Teacher Get data:---------------------
app.get("/teacgergetdata", async (req, res) => {
    try {
        const fetchTeacher = await Teacher.find({})
        if (!fetchTeacher) {
            res.status(200).json({ message: "failed in fetch", teacher: false })
        }
        res
            .status(200)
            .json({ message: "Success", status: true, user: fetchTeacher })
    } catch (error) {
        res.json({ error: error, message: "Error in Fetch Teacg" })
    }
})


// teacher Update-----------------------
app.post("/teacherupdate/:id", async (req, res) => {

    const teacherupdate = await Teacher.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
             returnDocument: "after"
        }
    );
    res.json({ message: "success", user: teacherupdate })

})
// delet techer -----------------------------------
app.delete("/deleteteacher/:id", async (req, res) => {
    console.log("delete", req.params);
    const id = req.params.id;
    const delTeacher = await Teacher.deleteOne({ _id: id });
    console.log(delTeacher);
    res.json({ message: "Success", status: true });

})












// to check a server
app.get("", (req, res) => {
    res.json({ message: "Hello" })
})

app.listen(8000, () => {
    console.log("create server")
})


// app.listen(8000, (req, res) => {
//     console.log("create server")
// })






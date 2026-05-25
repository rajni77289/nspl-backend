const mongoose=require("mongoose");

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

module.exports=Student
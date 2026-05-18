const mongoose = require("mongoose")

// signup:----
// // schema:-
const userschema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneno: {
        type: String,
    },
    datebirth: {
        type: String,
    },
    bio: {
        type: String,
    },
    state: {
        type: String,
    },

    // image:{
    //     data:buffer,
    //     ContentType:String,
    // }
});

// create model:-
const User = mongoose.model("user", userschema);

module.exports = User;

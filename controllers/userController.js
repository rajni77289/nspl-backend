const express = require("express");
const User = require("../models/userModel")

// create Api:- User
const signupUser = async (req, res) => {
    // step:1 :-   check the data (req.body)
    // console.log("user", req.body)

    try {
        const { username, email, password, phoneno, bio, state, datebirth } = req.body;

        const createusers = new User({
            username: username,
            email: email,
            password: password,
            phoneno: phoneno,
            datebirth: datebirth,
            bio: bio,
            state: state,
            // city: city,
            // imagedata: fs.readFileSync("uploads/" + req.file.filename),
            //     ContentType: "uploads/",
            // }



            // image:{
            //     data: fs.readFileSync("uploads/" + req.file.filename),
            //     ContentType: "uploads/",
            // }
        });
        // save data:-
        const saveuser = await createusers.save();

        if (saveuser) {
            res
                .status(200)
                .json({ message: "success", status: true, user: saveuser });
        }
        else {
            res.status(500).json({ message: "error", status: false });
        }
    }
    catch (error) {
        res.json({ error: error, message: "Error in signup" })
    }

};


//  login Data:-------------------------------------------------------------

const loginUser = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        // ye database me same email ka pehla record uthata h 
        const existUser = await User.findOne({ email: email });
        if (!existUser) {
            res.status(200).json({ message: "failed", status: false });
        }
        if (existUser.password !== password) {
            res.status(200).json({ message: "failed", status: false });
        }

        res.status(200).json({ message: "success", status: true, user: existUser });

    } catch (error) {
        res.json({ error: error, message: "Error in signup" })
    }


};


//  profile:---------------------------------------------------------------
const profileUser = async (req, res) => {
    console.log("user", req.body)
    const email = req.body.email
    console.log(email)
    try {

        const profiledata = await User.findOneAndUpdate(
            { email: email },
            req.body,
            {
                new: true
            }
        );
        res.status(200).json({
            message: "profile update successfully",
            user: profiledata,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "internal server error",
            error: error.message,
        })
    }


};


module.exports = { signupUser, loginUser, profileUser };
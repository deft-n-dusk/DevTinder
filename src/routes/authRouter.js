const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation.js")
const User = require("../models/user.js")
const bcrypt = require("bcrypt");


//SIGNUP API
authRouter.post("/signup", async (req, res) => {

    try{

    //Validate the data

    validateSignUpData(req);

    //Encrypt the password
    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName, lastName, emailId, password : passwordHash
    });

        await user.save();
        res.send("User added successfully");
    }
    catch (err){
        res.status(400).send("Error saving the user: " + err.message);
    }
})

// Login API
authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body; 


        //check if user with that emailId exists in our database or not

        const user = await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("Invalid credentials");
        }

        //check if entered password is correct

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            //Create a JWT token
            const token = await user.getJWT();
            

            //Add the token to the cookie and send the response back to the user
            res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)});


            res.send("Login successful");
        }
        else{
            throw new Error("Incorrect Password");
        }
    }
    catch (err){
        res.status(400).send("Error logging in: " + err.message);
    }
})






module.exports = authRouter;
const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")
const { validateProfileEditData} = require("../utils/validation.js");



// Get profile API
profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {
     const user = await req.user;
     
     res.send(user)
     }
     catch (err){
         res.status(400).send("Error logging in: " + err.message);
     }
 })


 //Profile edit API
 profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
       if(!validateProfileEditData(req)){
        throw new Error("Invalid edit data");
       } 
       const loggedInUser = req.user;
       Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

       //To save the new edited data of the user in the database
       await loggedInUser.save();

       res.send(`${loggedInUser.firstName}, Your profile was updated successfully`)
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
 })




module.exports = profileRouter;
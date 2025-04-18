const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")



// Get profile API
profileRouter.get("/profile", userAuth, async (req, res) => {

    try {
     const user = await req.user;
     
     res.send(user)
     }
     catch (err){
         res.status(400).send("Error logging in: " + err.message);
     }
 })




module.exports = profileRouter;
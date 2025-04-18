const express = require("express");
const requestsRouter = express.Router();




//Send connection request
requestsRouter.post("sendConnectionRequest", async (req, res) => {
    try {
        const user = await req.user;
        
        res.send(user.firstName + " sent connection request")
        }
        catch (err){
            res.status(400).send("Can't send connection request: " + err.message);
        }
})




module.exports = requestsRouter;
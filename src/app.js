const express  = require("express");
const connectDB = require("./config/database.js")

const app = express();


app.use(express.json());


const cookieParser = require("cookie-parser");
app.use(cookieParser());
const jwt = require("jsonwebtoken");

const authRouter = require("./routes/authRouter.js");
const profileRouter = require("./routes/profileRouter.js");
const requestsRouter = require("./routes/requestsRouter.js");
const userRouter = require("./routes/userRouter.js");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);






//Find user by email
// app.get("/user", userAuth, async(req, res) => {
//     const UsersEmail = req.body.emailId;

//     try{
//         const users = await User.find({emailId : UsersEmail});
//         if(users.length === 0){
//             res.send("No users found");
//         }
//         else{
//             res.send(users);
//         }
//     }
//     catch (err){
//         res.status(400).send("Something went wrong");
//     }
    

// })

// //Delete user by Id
// app.delete("/user", async(req, res) => {
//     const userId = req.body.userId;

//     try{
//         const user = await User.findByIdAndDelete(userId);
//         res.send("User deleted successfully");
//     }
//     catch (err){
//         res.status(400).send("Not deleted");
//     }
// })

// //Update User data
// app.patch("/user/:userId", async(req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;

//     try{
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isAllowedUpdates = Object.keys(data).every((k) => 
//             ALLOWED_UPDATES.includes(k));
//         if(!isAllowedUpdates){
//             throw new Error("Update not allowed!");
//         }
//         if(data?.skills.length > 20){
//             throw new Error("Skills should be under 20");
//         }
//         const user = await User.findByIdAndUpdate(userId, data, {
//             runValidators : true,
//         });
        
//         res.send("User updated successfully");
//     }
//     catch(err){
//         res.status(400).send("not updated");
//     }
// })



connectDB().then(() => {
    console.log("Database connection established");
    app.listen(2707, () => {
        console.log("Server is successfully listening")
    });
}).catch((err) => {
    console.error("Database Connection failed");
})



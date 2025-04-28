const express  = require("express");
const connectDB = require("./config/database.js")

const app = express();
const cors = require("cors");

// CORS Setup (ONLY this, nothing else)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));


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



connectDB().then(() => {
    console.log("Database connection established");
    app.listen(2707, () => {
        console.log("Server is successfully listening")
    });
}).catch((err) => {
    console.error("Database Connection failed");
})



const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20,
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password")
            } 
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value) {
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error ("Gender is not valid");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photoURL is not valid")
            }
        }
    },
    bio : {
        type : String,
        default : "Open to opportunities, collaborations, and great conversations."
    },
    skills : {
        type : [String],  
    },
}, {
    timestamps: true,
})

userSchema.index({firstName : 1, lastName : 1});
userSchema.index({gender : 1});

userSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$2713", {expiresIn : "7d"})

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){

    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
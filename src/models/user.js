const mongoose = require("mongoose");
const validator = require("validator");

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
            if(!["male", "female", "others"].includes(value)){
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
        default : "Hii"
    },
    skills : {
        type : [String],  
    },
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User;
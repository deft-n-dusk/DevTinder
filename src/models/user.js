const mongoose = require("mongoose");

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
    },
    password : {
        type : String,
        required : true,
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
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
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
const validator = require("validator");

const validateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter the name");
    }
    else if(firstName.length < 3 || firstName.length > 20){
        throw new Error("First name should be 2-20 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email id is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
}

const validateProfileEditData = (req) => {

    const allowedEditFields = ["firstName", "lastName", "emailId", "skills", "age", "gender", "bio", "photoUrl"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileEditData
}
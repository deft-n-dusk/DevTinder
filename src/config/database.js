const mongoose = require("mongoose");

const connectDB= async() => {
    await mongoose.connect("mongodb+srv://sonaltyagibiz:XYVZIJPoLjTGZnNi@namastenode.stwjr9s.mongodb.net/DevTinder");
}

module.exports = connectDB;


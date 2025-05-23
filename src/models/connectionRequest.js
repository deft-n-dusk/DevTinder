const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: User, //Reference to the User collection
        required : true,
    },

    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: User, //Reference to the User collection
        required : true,
    },

    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignore", "interested", "accepted", "rejected"],
            message : `{VALUE} is invalid status type`
        }
    }
 
}, {
    timestamps : true,
})

//Compound indexing for fast queries
connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
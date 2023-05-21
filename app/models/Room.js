const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Room name is required"]
    },
    room_type: {
        type: String,
        required: [true, "Room type is required"]
    },
    description: {
        type: String,
        required: [true, "Room type is required"]
    },
    status: {
        type: String,
        required: [true, "Room status is required"]
    },
    accessToken: {
        type: String,
        required: [true, "Token type is required    "]
    }
},
{
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

const Room = mongoose.model("rooms",roomSchema);
module.exports = Room;

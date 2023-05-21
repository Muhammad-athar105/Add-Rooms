const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:[true,"Name is required"],

    },
    email: {
        type: String,
        required: true,
        unique:[true, "A unique email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
    },
    status:String,
    
  },
  {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  });

const User = mongoose.model("users", userSchema);

module.exports = User;
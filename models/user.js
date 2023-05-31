const mongoose = require("mongoose");
const validatorJs = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new  mongoose.Schema(
    {
        name : {
            type:String,
            required: [true, 'Please provide name'],
            maxlength: 50,
            minlength: 3,
        },
        email :{
            type:String,
            required: [true,"pls provide email"],
            unique: true,
            validator:{
                validator:validatorJs.isEmail,
                message:"please provide valid email"
            }
        },
        password:{
            type:String,
            required :[true,"pls provide password"],
            minlength:8,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
          },
    }
);
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return; // check if the password got changed if so we hash it 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });


UserSchema.methods.comparePassword = async function (canditatePassword) {  // we can check this in controller but this better for better SOLID
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };

module.exports = mongoose.model("User",UserSchema);
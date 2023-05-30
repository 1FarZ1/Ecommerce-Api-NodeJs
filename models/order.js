const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        name : {
            type:String,
            required: [true, 'Please provide name'],
            maxlength: 50,
            minlength: 3,
        },
        
    }
);

module.exports = mongoose.model("Order",OrderSchema);
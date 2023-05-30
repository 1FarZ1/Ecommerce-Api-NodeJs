const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
    
    }
);

module.exports = mongoose.model("Order",OrderSchema);
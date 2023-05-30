const User = require('../models/user');

let getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({role:"user"}).select("-password");
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({msg:"server error" , error:error});
    }
}

let getUserById = async (req,res)=>{
}


let UpdateUserPassword = async (req,res)=>{
}

let UpdateUser = async (req,res)=>{
}

let getCurrentUser = async (req,res)=>{
}




module.exports = {  
    getAllUsers,
    getUserById,
    UpdateUserPassword,
    UpdateUser,
    getCurrentUser
}

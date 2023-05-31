const User = require('../models/user');
const createTokenUser = require('../utils/createTokenUser');
const { attachCookiesToResponse } = require('../utils/jwt');

let getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({role:"user"}).select("-password");
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({msg:"server error" , error:error});
    }
}

let getUserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({msg:"server error" , error:error});
    }
}


let UpdateUserPassword = async (req,res)=>{
    try {
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({ msg: 'oldpassword or new password invalid' })
        }
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(400).json({ msg: 'no user found' })
        }
        if (!user.comparePassword(oldPassword)) {
            return res.status(400).json({ msg: 'incorrect password' })
        }
        user.password = newPassword;
        await user.save();
    } catch (error) {
        return res.status(500).json({msg:"server error" , error:error});
    }

}

let UpdateUser = async (req,res)=>{
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(400).json({ msg: 'no user found' })
        }
        user.name = name;
        user.email = email;
        await user.save();
        const tokenUser = createTokenUser(user);
        attachCookiesToResponse({ res, user: tokenUser });
        return res.status(200).json({msg:"user updated successfully",user:tokenUser});

    } catch (error) {
        return res.status(500).json({msg:"server error" , error:error});
    }
}

let getCurrentUser = async (req,res)=>{
    try {
        return res.status(200).json({user:req.user});
    } catch (error) {
        return res.status(500).json({msg:"server error" , error:error});
    }
}




module.exports = {  
    getAllUsers,
    getUserById,
    UpdateUserPassword,
    UpdateUser,
    getCurrentUser
}

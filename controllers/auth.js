// const User = require('../models/User')


let register = async (req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ 
            msg: 'fill all the credentials',
         })
    }
    let userData = {name:username,email,password}; 
    const user =  await User.create(userData);
    let token =  await user.createJWT();

    res.status(200).json({ msg: 'user created',token });
}
let login  = async  (req,res)=>{    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'fill all the credentials' })
        }

        const user  = await User.findOne({email});
        if(!user){
            return res.status(400).json({ msg: 'no user found' })
        }
        if (!user.comparePassword(password)) {
            return res.status(400).json({ msg: 'incorrect password' })
        }    
        const token = user.createJWT();
    
        res.status(200).json({ user: { name: user.name }, token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'something went wrong',error })
        
    } 
}

const logout  = (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
module.exports = {
    login,
    register,
    logout
}



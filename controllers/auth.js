const User = require('../models/user');
const { createJwt, attachCookiesToResponse } = require('../utils/jwt');
const createTokenUser = require('../utils/createTokenUser');


let register = async (req,res)=>{
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
        return res.status(400).json({ 
            msg: 'fill all the credentials',
         })
    }
    const emailExist  = await User.findOne({email});
    if(emailExist){
        return res.status(400).json({ msg: 'email already exist' });
    }


    // check if he is the first user , if he is the first user , then make him admin
    const isFirstAccount = (await User.countDocuments({})) === 0;


    // ternary operator
    const role = isFirstAccount ? 'admin' : 'user';

    // create the user
    const user =  await User.create({name,email,password,role});


    // create the user token  that contains the user id and name and role
    const userForToken = createTokenUser(user);

    // create the jwt token
    let token =  createJwt(userForToken);
    attachCookiesToResponse({res,user:userForToken});

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



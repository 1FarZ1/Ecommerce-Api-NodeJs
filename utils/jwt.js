const jwt = require("jsonwebtoken")

const isTokenValid = (tk) =>  jwt.verify(tk,process.env.JWT_SECRET);

const createJwt = ({payload})=>{
     return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFETIME,
      });
}

// this is for setup the cookies for web , with cookies ,
const attachCookiesToResponse = ({ res, user }) => {
    const token = createJwt({ payload: user });
  
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });
  };
  
module.exports = {
    isTokenValid,
    createJwt,
    attachCookiesToResponse
}
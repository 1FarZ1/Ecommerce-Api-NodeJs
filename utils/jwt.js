
const jwt = require("jsonwebtoken")



const isTokenValid = (tk) =>  jwt.verify(tk,process.env.JWT_SECRET);



module.exports = {
    isTokenValid
}
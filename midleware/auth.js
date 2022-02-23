const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async (req, res, next) =>{
 try {
        
 const jwtToken = req.header("token");

 if(!jwtToken){
    return res.status(403).send("Non autorisé")
    }
 const payload = jwt.verify(jwtToken, process.env.JWTSECRET)

 req.user = payload.user

 }catch(err) {
        console.error(err.message)
        return res.status(403).send("Non autorisé")
}
}
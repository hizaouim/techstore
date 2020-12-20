const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
        console.log('in auth');
    const token = req.header('x-auth-token')
    if (!token)
        return res.status (401).json ('no auth token, denied')

    const verified = jwt.verify (token, process.env.JWT_TOKEN)
    if (!verified)
    return res.status (401).json ('token not verified')

    req.user = verified.id
    next();
    
    }catch(err){
        return res.status (500).json (err)

    }
}
module.exports = auth;
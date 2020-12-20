const router = require ('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post(async(req, res) => {
    try{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const passwordCheck = req.body.passwordCheck
    
    if (!email || !password || !passwordCheck)
   // console.log('enter all fields');
        return res.status(400).json({msg: 'please enter all fields'})
    if (password.length < 8)
        return res.status(400).json({msg: 'password must be at least 8 characters'})
    if (passwordCheck !== password)
        return res.status(400).json({msg: 'Passwords must match'})
    console.log(email);
    
    const existingUser = await User.find({ email });
    
    console.log(existingUser);
    const userExists = (typeof (existingUser) === 'object' 
                        && existingUser instanceof Array    
                        && existingUser.length > 0);

    if (userExists) {
        return res.status(400).json({ msg: 'this email address already exists' })
    }
    if (!username) username = email

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
        username : username,
        password : passwordHash,
        email : email
    })
    const savedUser = await newUser.save ()
    res.json(savedUser)
    //const newUser = new User ({username , email, password})

    //newUser.save()
    //.then(()=> res.json('User added'))
    //.catch(err => res.status(400).json('Error ' + err))
    }catch (err){
        res.status(500).json(err)
    }
})
router.route('/login').post(async(req, res) => {
    try{
        const {email, password} = req.body

    if (!email || !password )
        res.status(400).json({msg : 'not all fields are entered!'})

    const user = await User.findOne({email})
    if (!user )
    res.status(400).json({msg : 'user does not exist!'})


    const isMatch = await bcrypt.compare(password , user.password)
    if (!isMatch)
    res.status(400).json({msg : 'invalid credentials!'})
console.log(process.env.JWT_TOKEN);
    const token = jwt.sign({id : user._id}, process.env.JWT_TOKEN)
        res.json({
            token,
            user: {
                email : user.email,
                id : user._id,
                username : user.username
            }
        })
    }catch (err)
    {
        res.status(500).json(err.message)
    }
})

router.post('/tokenIsValid', async (req, res) =>{
    try {
        const token = req.header('x-auth-token')
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_TOKEN)
        if (!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if (!user) return res.json(false)

        return res.json(true)

    } catch (error) {
        res.status(500).json(error.message)
    }
}) 

router.get('/user' , auth, async (req, res) =>{
    console.log('here');
    const user  = await User.findById (req.user)
    res.json ({
      username :  user.username,
       id: user._id,
       email : user.email
    })
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router
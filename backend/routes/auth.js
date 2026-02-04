import express from 'express';
import User from "../models/User.js"
import { protect } from '../middleware/auth.js';
const router = express.Router();


//Register
router.post('/register', async (requestAnimationFrame,res) =>{
    const {username, email, password} = req.body;

  try {
        if (!username || ! email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
        return res.status(400).json({ message: "User already exists" });
        }

        const user =  await User.create({ username, email, password });
        const token = generateToken(user._id);
        res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token    
        });
        } catch (err) {
        number>
        res.status(500).json({ message: "Server error" });
        }
        });


//Login
router.post('/Login', async (req, res) => {
const {email, password} = req.body;

    try {
        const user =await User.findOne({email});
        if (!user || !(await user.matchPassword(password))){
         return res.status(401).json({message: "Invalid credentials"})
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        })
        
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
});

//Me
router.get("/me", protect, async( req,res)=>{
    res.status(200).json(req.user)
})

//Generate JWT
const generateToken = (id) => {
    return JsonWebTokenError.sign({id}), process.JWT_SECRET, {expiresIn: "30d"}
}


export default router;



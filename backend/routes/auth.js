// import express from "express";
// import User from "../models/User.js";
// import { protect } from "../middleware/auth.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Please fill all the fields" });
//     }

//     const userExists = await User.findOne({ $or: [{ email }, { username }] });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({ username, email, password });
    
//     res.status(201).json({
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (err) {
//     console.error("Register Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // Me
// router.get("/me", protect, async (req, res) => {
//   res.status(200).json(req.user);
// });

// // Helper: Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// export default router;

import express from "express";
import { supabase } from "../config/db.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return res.status(400).json({ message: error.message });

    const token = jwt.sign({ id: data.user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ token, user: data.user });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ message: error.message });

    const token = jwt.sign({ id: data.user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token, user: data.user });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" });
  }
});

// Get current user data (Fixes the "sign in again" issue)
// Get current user data
router.get("/me", auth, async (req, res) => {
  try {
    // We use the regular getUser() which is safer and doesn't require admin keys
    const { data: { user }, error } = await supabase.auth.getUser(req.headers.authorization.split(" ")[1]);
    
    if (error) return res.status(400).json({ message: error.message });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
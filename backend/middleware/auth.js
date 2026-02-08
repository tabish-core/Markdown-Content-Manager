// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       return next();
//     } catch (err) {
//       console.error("Token verification failed: ", err.message);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
//   return res.status(401).json({ message: "Not authorized, token failed" });
  
// };


import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Set user id from the decoded token so the routes can use it
      req.user = { id: decoded.id };

      return next();
    } catch (err) {
      console.error("Token verification failed: ", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};
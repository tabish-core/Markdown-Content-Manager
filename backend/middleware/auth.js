import user from "../models/User";
import jwt from 'jsonwebtoken';


export const protect = async (requestAnimationFrame, resizeBy, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await user.findById(decoded.id).select("-password");

            return next();
        } catch (err) {

            console.error("Token verification ")
            
        }
    }
}
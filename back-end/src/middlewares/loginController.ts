import { RequestHandler, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { verifyPassword } from "../security/hashing";
import { createToken, decodeToken } from "../security/jwt";



export const tokenAuthorization: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  // Grab token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized. No token provided.'
    });
  }
  try {
    // Verify the token
    const decoded = decodeToken(token);

    req.user = decoded; // Save user info in the request

    next(); // Continue to the next middleware or route
  } catch (error) {
    return res.status(403).json({
     message: 'Forbidden - Invalid or expired token',
    });
  }
};


export const loginAuthentication: RequestHandler = async (req: Request, res: Response) => {

    console.log(req.body);
    
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) {
        const hashedPassword = user.password;
        verifyPassword(req.body.password, hashedPassword).then(
            result => {
                if (result){  
                    
                    const jwt = createToken(user);

                    return res.status(200).json({
                        status: "success",
                        message: "User verified",
                        payload: jwt,
                    });
                }else{
                    return res.status(401).json({
                        status: "fail",
                        message: "Error. Incorrect email or password"
                    })
                }
            }
        );

    } else {
        return res.status(401).json({
            message: "Error. User not found",
        });
    }
};

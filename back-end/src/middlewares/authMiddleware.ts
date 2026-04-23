import { RequestHandler, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { verifyPassword } from "../security/hashing";
import { createToken, decodeToken, unverifiedUser } from "../security/jwt";
import { Company } from "../models/company";


export const tokenAuthorization: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  // Grab token from the authorization header
  //const authHeader = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies.token;

  // If request doesnt have token
  if (!token) {
    // Asign the unverified user profile
    req.user = unverifiedUser; 
    return next();
  }

  try {
    // Verify the token
    const decoded = decodeToken(token);

    req.user = decoded; // Save user info in the request

    next(); // Continue to the next middleware or route
  } catch (error) {
    
    // Asign the unverified user profile
    req.user = unverifiedUser; 
    next();
  }
};


export const getProfile: RequestHandler = async (req: Request, res: Response) => {
    const token = req.cookies.token; // Look ma, no manual headers!
    
    console.log("GET PROFILE");
    console.log(req.user);
    
    return res.status(200).json({ 
        status: 'success',
        messege: token ? 'Valid Token' : 'Invalid token',
        payload: req.user 
    });
}

export const loginAuthentication: RequestHandler = async (req: Request, res: Response) => {

    console.log(req.body);

    const user = await User.findOne({
        where: {
            email: req.body.email
        },
        include: [{ model: Company, attributes: ["id", "name", "memberType"] }]
    });

    if (user) {
        const hashedPassword = user.password;
        verifyPassword(req.body.password, hashedPassword).then(
            result => {
                if (result){  
                    
                    const jwt = createToken(user);

                    console.log();
                    res.cookie('token', jwt, {
                        httpOnly: true, 
                        secure: process.env.NODE_ENV === 'production', // Use true in prod (HTTPS)
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                        maxAge: 7200000  // 2 hours
                    });
                    
                    res.status(200).json({
                        status: "success",
                        message: "Logged in successfully"
                    })
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

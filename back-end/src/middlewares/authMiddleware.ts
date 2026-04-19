import { RequestHandler, Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { verifyPassword } from "../security/hashing";
import { createToken, decodeToken, unverifiedUser } from "../security/jwt";
import { Company } from "../models/company";

export const adminCheck: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const unsafeMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];

    if (unsafeMethods.includes(req.method) && req.user?.role !== 'admin') {
        return res.status(403).json({ 
        message: "Forbidden: You do not have permission to modify data." 
        });
    }
    next();
}



export const tokenAuthorization: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  // Grab token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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
                    
                    const responsePayload = { 
                        token: jwt, 
                        userInfo: {
                            username: user.name,
                            companyId: user.companyId,
                            isAdmin: user.role === 'admin',
                            companyRole: user.company?.memberType
                        }
                    };

                    console.log();

                    return res.status(200).json({
                        status: "success",
                        message: "User verified",
                        payload: responsePayload,
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

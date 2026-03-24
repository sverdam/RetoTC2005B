import { RequestHandler, Request, Response } from "express";
import { User } from "../models/user";
import { verifyPassword } from "../security/hashing";
import { createToken } from "../security/jwt";

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

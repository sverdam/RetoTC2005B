import { RequestHandler, Request, Response } from "express";
import { User } from "../models/user";
import { verifyPassword } from "../security/hashing";

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
                    return res.status(200).json({
                        status: "success",
                        message: "User verified",
                        payload: user.toJSON(),
                    });
                }else{
                    return res.status(401).json({
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

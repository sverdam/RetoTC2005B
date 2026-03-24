import { RequestHandler, Request, Response } from "express";
import { User } from "../models/user";
import { verifyPassword } from "../security/hashing";

export const loginAuthentication: RequestHandler = async (req: Request, res: Response) => {

    console.log(req.body);
    return res.status(200).json(req.body); // Test function
};

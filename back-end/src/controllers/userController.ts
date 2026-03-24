import { RequestHandler, Request, Response } from "express";
import { User } from "../models/user";
import { Company } from "../models/company";
import { hashPassword } from "../security/hashing";
import { hash } from "node:crypto";

// Create new user
export const createUser: RequestHandler = (req: Request, res: Response) => {

    // Validate request
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    // Save user in db
    const user = { ...req.body };
    console.log(user);
    hashPassword(user.password).then( hashed => 
    {
        user.password = hashed;
        console.log(user);
        User.create(user)
            .then((data: User | null) => {
                res.status(200).json({
                    status: "success",
                    message: "User successfully created",
                    payload: data,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    message: "Something happened creating a user. " + err.message,
                    payload: null,
                });
            });
    }
    ).catch((err: Error) => 
    {   
        return res.status(500).json({
            status: "error",
            message: "Something happend while creating the password: " + err,
            payload: null,
        });
    });
};


// Get all users
export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users: Array<User> = await User.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting users",
            error
        });
    }
};


// Get user by id
export const getUserById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const user: User | null = await User.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting user",
            error
        });
    }
};


// Update user
export const updateUser: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    User.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "User successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the user.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a user. " + err.message,
                payload: null,
            });
        });
};


// Delete user
export const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await User.destroy({ where: { id } });
        res.status(200).json({
            message: "User deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error,
        });
    }
};
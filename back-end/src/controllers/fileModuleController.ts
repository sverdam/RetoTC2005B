import { RequestHandler, Request, Response } from "express";
import { FileModule } from "../models/fileModule";
import { Company } from "../models/company";

//CHANGE THIS SO THAT
//When creating fileModule if pos and company combination exist delete or update the current fileModule and file for the new one both in files folder and db
//When updating a fileModule also change the file in the file folder not only in the db
//when erasing a fileModule also erase the in file folder
//Investigar como devolver URL firmadas para seguridad
//Investigar sobre como agregar un archivo desde el frontend a la carpeta de files (probablemente como un blob o file type)


// Create new fileModule
export const createFileModule: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const fileModule = { ...req.body };

    FileModule.create(fileModule)
        .then((data: FileModule | null) => {
            res.status(200).json({
                status: "success",
                message: "File Module successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a File Module. " + err.message,
                payload: null,
            });
        });
};


// Get all File Modules
export const getAllFileModules: RequestHandler = async (req: Request, res: Response) => {
    try {
        const fileModule: Array<FileModule> = await FileModule.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Module",
            error
        });
    }
};


// Get File Module by id
export const getFileModuleById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const fileModule: FileModule | null = await FileModule.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Module",
            error
        });
    }
};


// Update File Module 
export const updateFileModule: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    FileModule.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "File Module successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the File Module.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a File Module. " + err.message,
                payload: null,
            });
        });
};


// Delete File Module
export const deleteFileModule: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await FileModule.destroy({ where: { id } });

        res.status(200).json({
            message: "File Module deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting File Module",
            error,
        });
    }
};
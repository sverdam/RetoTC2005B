import { RequestHandler, Request, Response } from "express";
import { FileModule } from "../models/fileModule";
import { Company } from "../models/company";
import { CheckPosBody, CreateOrReplaceFileModule, UpdateData } from "../services/fileModuleService";


//To Do:
//agregar soft delete
//que solo se puedan agregar archivos de imagen (png, jpg, etc) a logo e imagen y todo lo demas en documentos
//agregar otras funciones Delete, search, update

// Create new fileModule
export const createFileModule: RequestHandler = async (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }
    if (!req.body.companyId || !req.body.position || !req.body.type) {
        return res.status(400).json({
            status: "error",
            message: "companyId, position and type are required.",
            payload: null,
        });
    }
        
    const existingFileModule = await CheckPosBody(
        Number(req.body.companyId),
        Number(req.body.position)
    )

    //agregar datos del archivo generado
    const newData = await UpdateData(
        req.body,
        req.file
    )
    
    const result = await CreateOrReplaceFileModule(existingFileModule, newData);

    return res.status(result.action === "created" ? 201: 200).json({
        status: "success",
        message:
            result.action === "created"
            ? "File Module successfully created"
            : "File Module successfully updated",
        payload: result.data

    })
};

// Update File Module 
export const updateFileModule: RequestHandler = async (req: Request, res: Response) => {
    try {
        if (!req.body.companyId || !req.body.position || !req.body.type) {
            return res.status(400).json({
                status: "error",
                message: "companyId, position and type are required.",
                payload: null,
            });
        }

        if (!req.body) {
            return res.status(400).json({
                status: "error",
                message: "Content can not be empty.",
                payload: null,
            });
        }
        const existingFileModule = await CheckPosBody(
            Number(req.body.companyId),
            Number(req.body.position)
        )

        const newData = await UpdateData(
            req.body,
            req.file!
        )

        const result =await CreateOrReplaceFileModule(existingFileModule, newData);

        return res.status(200).json({
            status: "success",
            message: "File Module successfully updated",
            payload: result.data
        });
    } catch (err: any){
        return res.status(500).json({
            status: "error",
            message: "Something happened updating the File Module" + err.message,
            payload: null
        })
    }

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
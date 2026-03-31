import { RequestHandler, Request, Response } from "express";
import { FileModule } from "../models/fileModule";
import { Company } from "../models/company";
import { FileData, FileDataWithFile , CheckPosBody, CreateOrReplaceFileModule, BuildFileDataForCreate, BuildFileDataForUpdate, updateFileModuleFile, updateFileModuleData, DeleteFile, ChangeFileName, MoveFileModule} from "../services/fileModuleService";
//To Do:
//agregar soft delete
//que solo se puedan agregar archivos de imagen (png, jpg, etc) a logo e imagen y todo lo demas en documentos

// Create new fileModule
export const createFileModule: RequestHandler = async (req: Request, res: Response) => {
    try{
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
    const newData = await BuildFileDataForCreate(
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

    }catch (err: any){
        return res.status(500).json({
            status: "error",
            message: "Something happened while creating the File Module" + err.message,
            payload: null
        })
    }
};

// Update File Module 
export const updateFileModuleFileHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "File is required.",
                payload: null,
            });
        }
        const id = Number(req.params.id);
        const existingFileModule: FileModule | null = await FileModule.findByPk(id)

        if (existingFileModule === null){
            return res.status(404).json({
                status: "error",
                message: "Existing FileModule not found.",
                payload: null,
            });
        }


        const newData = await BuildFileDataForUpdate(
            req.body,
            existingFileModule,
            req.file
        )

        const result = await updateFileModuleFile(existingFileModule, newData, req.body); //checa q pedo con esto

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
//Update the Data of a FileModule
export const updateFileModuleDataHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "body is required.",
            payload: null,
        });
    }
        const id = Number(req.params.id);
        const existingFileModule: FileModule | null = await FileModule.findByPk(id)

        if (existingFileModule === null){
            return res.status(404).json({
                status: "error",
                message: "Existing FileModule not found.",
                payload: null,
            });
        }

        const result =  await updateFileModuleData(existingFileModule, req.body)

         return res.status(200).json({
            status: "success",
            message: "File Module Data successfully updated",
            payload: result
        });


    }catch (err: any){
        return res.status(500).json({
            status: "error",
            message: "Something happened updating the File Module Data " + err.message,
            payload: null
        })
    }
}

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

export const getFileModulesByCompanyId: RequestHandler = async(req: Request, res: Response) =>{
    const companyId = Number(req.params.id);
    try {
        const fileModule: Array<FileModule> = await FileModule.findAll({
            where: {
                companyId: companyId,
            },
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Modules",
            error
        });
    }
}

export const getFileModulesByPosition: RequestHandler = async(req:Request, res: Response) =>{
    const position = Number(req.params.position);
    try {
        const fileModule: Array<FileModule> = await FileModule.findAll({
            where: {
                position: position,
            },
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Modules",
            error
        });
    }
}

export const getFileModulesByCompanyIdAndPosition: RequestHandler = async(req: Request, res: Response) =>{
    const companyId = Number(req.params.companyId);
    const position = Number(req.params.position);
    try {
        const fileModule = await FileModule.findOne({
            where: {
                position: position,
                companyId: companyId
            },
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Modules",
            error
        });
    }
}

export const getFileModuleByType: RequestHandler = async(req:Request, res: Response) => {
    const type = req.params.type
    try {
        const fileModule: Array<FileModule> = await FileModule.findAll({
            where: {
                type: type,
            },
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Modules",
            error
        });
    }
}

export const getFileModuleByCompanyAndType: RequestHandler = async(req:Request, res: Response) => {
    const companyId = Number(req.params.companyId);
    const type = req.params.type
    try {
        const fileModule: Array<FileModule> = await FileModule.findAll({
            where: {
                companyId: companyId,
                type: type
            },
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(fileModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting File Modules",
            error
        });
    }
}


// Delete File Module
export const deleteFileModuleFile: RequestHandler = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);
        const existingFileModule: FileModule | null = await FileModule.findByPk(id)

        if (existingFileModule === null){
            return res.status(404).json({
            status: "error",
            message: "FileModule to be deleted not found.",
            payload: null,
                });
        }

        const result = await DeleteFile(existingFileModule)


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

export const deleteFileModule: RequestHandler = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const existingFileModule: FileModule | null = await FileModule.findByPk(id)

        if (existingFileModule === null){
            return res.status(404).json({
            status: "error",
            message: "FileModule to be deleted not found.",
            payload: null,
                });
        }
        if (existingFileModule.path){      
           await DeleteFile(existingFileModule)
        }
        
        await existingFileModule.destroy()

        return res.status(200).json({
            status: "success",
            message: "File and FileModule deleted successfully",
            payload: null
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting File",
            error
        });
    }  
};

export const restoreFileModule: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await FileModule.restore({ where: { id } }); 
        res.status(200).json({ message: "FileModule restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring file modules", 
            error, 
        }); 
    } 
}; 
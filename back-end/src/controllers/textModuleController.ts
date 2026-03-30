import { RequestHandler, Request, Response } from "express";
import { TextModule } from "../models/textModule";
import { Company } from "../models/company";


// Create new textModule
export const createTextModule: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const textModule = { ...req.body };

    TextModule.create(textModule)
        .then((data: TextModule | null) => {
            res.status(200).json({
                status: "success",
                message: "Text Module successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a Text Module. " + err.message,
                payload: null,
            });
        });
};


// Get all Text Modules
export const getAllTextModules: RequestHandler = async (req: Request, res: Response) => {
    try {
        const textModule: Array<TextModule> = await TextModule.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(textModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting Text Module",
            error
        });
    }
};


// Get Text Module by id
export const getTextModuleById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const textModule: TextModule | null = await TextModule.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(textModule);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting Text Module",
            error
        });
    }
};


// Update Text Module 
export const updateTextModule: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    TextModule.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Text Module successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the Text Module.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a Text Module. " + err.message,
                payload: null,
            });
        });
};


// Delete Text Module
export const deleteTextModule: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await TextModule.destroy({ where: { id } });

        res.status(200).json({
            message: "Text Module deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Text Module",
            error,
        });
    }
};

// Restore Text Module
export const restoreTextModule: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await TextModule.restore({ where: { id } }); 
        res.status(200).json({ message: "Text Module restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring Text Module", 
            error, 
        }); 
    } 
}; 
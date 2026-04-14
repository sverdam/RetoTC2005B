import { RequestHandler, Request, Response } from "express";
import { Filter } from "../models/filter";
import { Category } from "../models/category";


// Create new filter
export const createFilter: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const filter = { ...req.body };

    Filter.create(filter)
        .then((data: Filter | null) => {
            res.status(200).json({
                status: "success",
                message: "Filter successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a filter. " + err.message,
                payload: null,
            });
        });
};


// Get all filters
export const getAllFilters: RequestHandler = async (req: Request, res: Response) => {
    try {
        const filters: Array<Filter> = await Filter.findAll({
            attributes: { exclude: ["categoryId"] },
            include: [{ model: Category, attributes: ["id", "name"] }],
        });

        return res.status(200).json(filters);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting filters",
            error
        });
    }
};


// Get filter by id
export const getFilterById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const filter: Filter | null = await Filter.findByPk(id, {
            attributes: { exclude: ["categoryId"] },
            include: [{ model: Category, attributes: ["id", "name"] }],
        });

        return res.status(200).json(filter);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting filter",
            error
        });
    }
};


// Update filter
export const updateFilter: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Filter.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Filter successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the filter.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a filter. " + err.message,
                payload: null,
            });
        });
};


// Delete filter
export const deleteFilter: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Filter.destroy({ where: { id } });

        res.status(200).json({
            message: "Filter deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting filter",
            error,
        });
    }
};

// Restore filter
export const restoreFilter: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Filter.restore({ where: { id } }); 
        res.status(200).json({ message: "Filter restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring filters", 
            error, 
        }); 
    } 
}; 
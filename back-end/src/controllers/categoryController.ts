import { RequestHandler, Request, Response } from "express";
import { Category } from "../models/category";
import { Filter } from "../models/filter";


// Create new category
export const createCategory: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const category = { ...req.body };

    Category.create(category)
        .then((data: Category | null) => {
            res.status(200).json({
                status: "success",
                message: "Category successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a category. " + err.message,
                payload: null,
            });
        });
};


// Get all categories
export const getAllCategories: RequestHandler = async (req: Request, res: Response) => {
    try {
        const categories: Array<Category> = await Category.findAll({
            include: [ 
                {
                    model: Filter,
                    attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] }
                }
            ]
        });

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting categories",
            error
        });
    }
};


// Get category by id
export const getCategoryById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const category: Category | null = await Category.findByPk(id, {
            include: [ 
                {
                    model: Filter,
                    attributes: { exclude: ["categoryId", "createdAt", "updatedAt"] }
                }
            ]
        });

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting category",
            error
        });
    }
};


// Update category
export const updateCategory: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Category.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Category successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the category.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a category. " + err.message,
                payload: null,
            });
        });
};


// Delete category
export const deleteCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Category.destroy({ where: { id } });

        res.status(200).json({
            message: "Category deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting category",
            error,
        });
    }
};

// Restore category
export const restoreCategory: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Category.restore({ where: { id } }); 
        res.status(200).json({ message: "Category restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring categories", 
            error, 
        }); 
    } 
}; 
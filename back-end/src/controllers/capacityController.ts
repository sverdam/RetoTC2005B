import { RequestHandler, Request, Response } from "express";
import { Capacity } from "../models/capacities";
import { Company } from "../models/company";


// Create new capacity
export const createCapacity: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const capacity = { ...req.body };

    Capacity.create(capacity)
        .then((data: Capacity | null) => {
            res.status(200).json({
                status: "success",
                message: "Capacity successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a capacity. " + err.message,
                payload: null,
            });
        });
};


// Get all Capacities
export const getAllCapacities: RequestHandler = async (req: Request, res: Response) => {
    try {
        const Capacities: Array<Capacity> = await Capacity.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(Capacities);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting Capacities",
            error
        });
    }
};


// Get capacity by id
export const getCapacityById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const capacity: Capacity | null = await Capacity.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(capacity);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting capacity",
            error
        });
    }
};


// Update capacity
export const updateCapacity: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Capacity.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Capacity successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the capacity.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a capacity. " + err.message,
                payload: null,
            });
        });
};


// Delete capacity
export const deleteCapacity: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Capacity.destroy({ where: { id } });

        res.status(200).json({
            message: "Capacity deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting capacity",
            error,
        });
    }
};

// Restore capacity
export const restoreCapacity: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
        await Capacity.restore({ where: { id } });
        res.status(200).json({ message: "Capacity restored" });
    } catch (error) {
        res.status(500).json({
            message: "Error restoring capacity",
            error,
        });
    }
}; 
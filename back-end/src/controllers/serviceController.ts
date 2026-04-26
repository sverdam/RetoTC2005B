import { RequestHandler, Request, Response } from "express";
import { Service } from "../models/services";
import { Company } from "../models/company";


// Create new service
export const createService: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const service = { ...req.body };

    Service.create(service)
        .then((data: Service | null) => {
            res.status(200).json({
                status: "success",
                message: "Service successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a service. " + err.message,
                payload: null,
            });
        });
};


// Get all services
export const getAllServices: RequestHandler = async (req: Request, res: Response) => {
    try {
        const services: Array<Service> = await Service.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting services",
            error
        });
    }
};


// Get service by id
export const getServiceById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const service: Service | null = await Service.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting service",
            error
        });
    }
};


// Update service
export const updateService: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Service.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Service successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the service.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a service. " + err.message,
                payload: null,
            });
        });
};


// Delete service
export const deleteService: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Service.destroy({ where: { id } });

        res.status(200).json({
            message: "Service deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting service",
            error,
        });
    }
};

// Restore service
export const restoreService: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Service.restore({ where: { id } }); 
        res.status(200).json({ message: "Service restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring service", 
            error, 
        }); 
    } 
}; 
import { RequestHandler, Request, Response } from "express";
import { Location } from "../models/location";
import { Company } from "../models/company";


// Create new location
export const createLocation: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const location = { ...req.body };

    Location.create(location)
        .then((data: Location | null) => {
            res.status(200).json({
                status: "success",
                message: "Location successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a location. " + err.message,
                payload: null,
            });
        });
};


// Get all locations
export const getAllLocations: RequestHandler = async (req: Request, res: Response) => {
    try {
        const locations: Array<Location> = await Location.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(locations);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting locations",
            error
        });
    }
};


// Get location by id
export const getLocationById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const location: Location | null = await Location.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(location);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting location",
            error
        });
    }
};


// Update location
export const updateLocation: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Location.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Location successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the location.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a location. " + err.message,
                payload: null,
            });
        });
};


// Delete location
export const deleteLocation: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Location.destroy({ where: { id } });

        res.status(200).json({
            message: "Location deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting location",
            error,
        });
    }
};

// Restore location
export const restoreLocation: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Location.restore({ where: { id } }); 
        res.status(200).json({ message: "Location restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring locations", 
            error, 
        }); 
    } 
}; 
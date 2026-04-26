import { RequestHandler, Request, Response } from "express";
import { Certification } from "../models/certification";
import { Company } from "../models/company";


// Create new certification
export const createCertification: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const certification = { ...req.body };

    Certification.create(certification)
        .then((data: Certification | null) => {
            res.status(200).json({
                status: "success",
                message: "Certification successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a certification. " + err.message,
                payload: null,
            });
        });
};


// Get all certifications
export const getAllCertifications: RequestHandler = async (req: Request, res: Response) => {
    try {
        const certifications: Array<Certification> = await Certification.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(certifications);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting certifications",
            error
        });
    }
};


// Get certification by id
export const getCertificationById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const certification: Certification | null = await Certification.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(certification);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting certification",
            error
        });
    }
};


// Update certification
export const updateCertification: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Certification.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Certification successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the certification.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a certification. " + err.message,
                payload: null,
            });
        });
};


// Delete certification
export const deleteCertification: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Certification.destroy({ where: { id } });

        res.status(200).json({
            message: "Certification deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting certification",
            error,
        });
    }
};

// Restore certification
export const restoreCertification: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Certification.restore({ where: { id } }); 
        res.status(200).json({ message: "Certification restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring certifications", 
            error, 
        }); 
    } 
}; 
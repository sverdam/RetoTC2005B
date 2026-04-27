import { RequestHandler, Request, Response } from "express";
import { LandingPage } from "../models/landingPage";
import { Company } from "../models/company";

// Get extra data
export const getExtraInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const adminCompany: Company | null = await Company.findOne({
            where: { memberType: "Admin" }
        });

        if (adminCompany == null) {
            return res.status(404).json({
            message: "Error, extra info does not exist"
            });
        }
        
        const location = adminCompany.locations;

        return res.status(200).json({
            location: location?.dataValues,
            pdf: null
        })
    } 
    catch (error) {
        return res.status(500).json({
            message: "Error getting extra info",
            error
        });
    }
}


// Get
export const getLandingPage: RequestHandler = async (req: Request, res: Response) => {
    try {
        const landingPageInfo: LandingPage | null = await LandingPage.findOne();
        return res.status(200).json(landingPageInfo)
    } catch (error) {
        return res.status(500).json({
            message: "Error getting landing page",
            error
        });
    }
}


// Update 
export const updateLandingPage: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    if (!(['admin', 'CLAS editor'].includes(req.user?.role ?? 'unverified'))
        && ( process.env.ALLOW_ALL_REQUESTS ?? "true") !== "true") {
        return res.status(403).json({ 
        message: "Forbidden: You do not have permission to modify any data." 
        });
    }

    LandingPage.update({ ...req.body }, { where: { ...{ isActive: true } } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Landing page successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the info.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a info. " + err.message,
                payload: null,
            });
        });
};
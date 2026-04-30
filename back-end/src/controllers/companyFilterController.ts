import { RequestHandler, Request, Response } from "express";
import { Filter } from "../models/filter";
import { Company } from "../models/company";
import { CompanyFilter } from "../models/companyFilter";


// Create new companyfilter
export const createCompanyFilter: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const companyFilter = { ...req.body };

    CompanyFilter.create(companyFilter)
        .then((data: CompanyFilter | null) => {
            res.status(200).json({
                status: "success",
                message: "Companyfilter successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a Companyfilter. " + err.message,
                payload: null,
            });
        });
};


// Get all Companyfilters
export const getAllCompanyFilters: RequestHandler = async (req: Request, res: Response) => {
    try {
        const companyFilters: Array<CompanyFilter> = await CompanyFilter.findAll({});

        return res.status(200).json(companyFilters);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting companyfilters",
            error
        });
    }
};

// Get Comapnyfilter by company id
export const getCompanyFilterByComapnyId: RequestHandler = async (req: Request, res: Response) => {
    const companyId = Number(req.params.id);

    try {
        const companyFilters: Array<CompanyFilter> | null = await CompanyFilter.findAll({ 
            where: {
                companyId: companyId,
            }});

        return res.status(200).json(companyFilters);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting companyFilters",
            error
        });
    }
};

// Get Comapnyfilter by filter id
export const getCompanyFilterByFilterId: RequestHandler = async (req: Request, res: Response) => {
    const filterId = Number(req.params.id);

    try {
        const companyFilters: Array<CompanyFilter> | null = await CompanyFilter.findAll({ 
            where: {
                filterId: filterId,
            }});

        return res.status(200).json(companyFilters);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting companyFilters",
            error
        });
    }
};



// Update Companyfilter
export const updateCompanyFilter: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    CompanyFilter.update({ ...req.body }, { where: { companyId: req.params.companyId, filterId: req.params.filterId } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Companyfilter successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the Companyfilter.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a Companyfilter. " + err.message,
                payload: null,
            });
        });
};


// Delete Companyfilter
export const deleteCompanyFilter: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const companyId = Number(req.params.companyId);
    const filterId = Number(req.params.filterId);
    try {
        await CompanyFilter.destroy({ where: { companyId, filterId } });

        res.status(200).json({
            message: "Companyfilter deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Companyfilter",
            error,
        });
    }
};

// Restore Companyfilter
export const restoreCompanyFilter: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const companyId = Number(req.params.companyId);
    const filterId = Number(req.params.filterId);
    try { 
        await CompanyFilter.restore({ where: { companyId, filterId } }); 
        res.status(200).json({ message: "Companyfilter restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring Companyfilters", 
            error, 
        }); 
    } 
}; 
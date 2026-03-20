import { RequestHandler, Request, Response } from "express";
import { Company } from "../models/company"; 
import { User } from "../models/user";
import { Location } from "../models/location";
import { Contact } from "../models/contact";
 

//Create new company 
export const createCompany: RequestHandler = (req: Request, res: Response) => { 
    //Validate request 
    if (!req.body) { 
        return res.status(400).json({ 
        status: "error", 
        message: "Content can not be empty", 
        payload: null, 
        }); 
    } 
    
    // Save Company in the database 
    const company = { ...req.body }; 
    Company.create(company) 
        .then((data: Company | null) => { 
        res.status(200).json({ 
            status: "success", 
            message: "Company successfully created", 
            payload: data, 
        }); 
        }) 
        .catch((err) => { 
        res.status(500).json({ 
            status: "error", 
            message: "Something happened creating a company. " + err.message, 
            payload: null, 
        }); 
        }); 
}; 

// Get all companies 
export const getAllCompanies: RequestHandler = async (req:Request, res:Response)=>{ 
    try { 
        const companies:Array<Company> = await Company.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ["password", "companyId", "createdAt", "updatedAt"] }
                },
                {
                    model: Location,
                    attributes: { exclude: ["companyId", "createdAt", "updatedAt"] }
                },
                {
                    model: Contact,
                    attributes: { exclude: ["companyId"] }
                }
            ]
        }); 
        return res.status(200).json(companies); 
    } catch (error) { 
        return res.status(500).json({ 
        "message":"Error getting companies",  
        error 
        }); 
    } 
};

 

// Get company by Id 
export const getCompanyById: RequestHandler = async (req:Request, res:Response)=>{ 
    const id = Number(req.params.id)
    try { 
        const company:Company | null = await Company.findByPk(id, {
            include: [ 
                {
                    model: User,
                    attributes: { exclude: ["password", "companyId", "createdAt", "updatedAt"] }
                },
                {
                    model: Location,
                    attributes: { exclude: ["companyId", "createdAt", "updatedAt"] }
                },
                {
                    model: Contact,
                    attributes: { exclude: ["companyId"] }
                }
            ]
        }); 
        return res.status(200).json(company); 
    } catch (error) { 
        return res.status(500).json({ 
        "message":"Error getting company",  
        error 
        }); 
    } 
};

 

// Modify company 
export const updateCompany:RequestHandler = (req: Request, res: Response) => { 
    // Validate request 
    if (!req.body) { 
        return res.status(400).json({ 
        status: "error", 
        message: "Content can not be empty.", 
        payload: null, 
        }); 
    } 

    // Save Company in the database 
    Company.update({ ...req.body }, { where: { id: req.params.id } }) 
    .then((isUpdated) => { 
        if (isUpdated) { 
        return res.status(200).json({ 
            status: "success", 
            message: "Company successfully updated", 
            payload: { ...req.body }, 
        }); 
        } else { 
        return res.status(500).json({ 
            status: "error", 
            message: "Something happened updating the company. ", 
            payload: null, 
        }); 
    } 
    }) 
    .catch((err) => { 
        res.status(500).json({ 
        status: "error", 
        message: "Something happened updating a company. " + err.message, 
        payload: null, 
    }); 
    }); 
}; 
 
// Delete a Company with the specified id in the request 

export const deleteCompany: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Company.destroy({ where: { id } }); 
        res.status(200).json({ message: "Company deleted" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error deleting companies", 
            error, 
        }); 
    } 
}; 



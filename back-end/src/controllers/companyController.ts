import { RequestHandler, Request, Response } from "express";
import { Company } from "../models/company"; 
import { User } from "../models/user";
import { Location } from "../models/location";
import { Contact } from "../models/contact";
import { TextModule } from "../models/textModule";
import { FileModule, FileType } from "../models/fileModule";


// This functinos recieves a company, looks for its logo in the FileModule table, and finally it attaches it to the company object.
const addFilesToCompany = async (company: Company | null) => {

    if (company == null) return company;

    const logoModule: FileModule | null = await FileModule.findOne({
            attributes: { exclude: ["company", "createdAt", "updatedAt", "deletedAt",
                                    "storedName", "originalName", "path", "mimeType", "size", "position"
            ] },
            where: { companyId: company.id, type: 'logo' },
            plain: true      
        });

    const pdfModule: FileModule | null = await FileModule.findOne({
            attributes: { exclude: ["company", "createdAt", "updatedAt", "deletedAt",
                                    "storedName", "originalName", "path", "mimeType", "size", "position"
            ] },
            where: { companyId: company.id, type: 'document' },
            plain: true      
        });

    const result = {...company.dataValues, logo: logoModule?.dataValues, catalog: pdfModule?.dataValues};

    return result;
}

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
                    attributes: { exclude: ["password", "companyId", "createdAt", "updatedAt", "deletedAt"] }
                },
                {
                    model: Location,
                    attributes: { exclude: ["companyId", "createdAt", "updatedAt", "deletedAt"] }
                },
                {
                    model: Contact,
                    attributes: { exclude: ["companyId"] }
                },
                {
                    model: TextModule,
                    attributes: { exclude: ["companyId", "createdAt", "updatedAt", "deletedAt"] }
                }
            ]
        }); 

        //companies.map(company => addLogoToCompany);
        const filePromises = companies.map(async (item) => {
            return await addFilesToCompany(item);
        });

        const companiesWithFiles = await Promise.all(filePromises);

        return res.status(200).json(companiesWithFiles); 
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
                    attributes: { exclude: ["password", "companyId", "createdAt", "updatedAt", "deletedAt"] }
                },
                {
                    model: Location,
                    attributes: { exclude: ["companyId", "createdAt", "updatedAt", "deletedAt"] }
                },
                {
                    model: Contact,
                    attributes: { exclude: ["companyId"] }
                },
                {
                    model: TextModule,
                    attributes: { exclude: ["companyId", "createdAt", "updatedAt", "deletedAt"] }
                }
            ]
        }); 

        const companyWithFiles = await addFilesToCompany(company);

        return res.status(200).json(companyWithFiles); 
    } 
    catch (error) { 
        return res.status(500).json({ 
        "message": `Error getting company: ${error}`,  
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

// Restore a Company

export const restoreCompany: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Company.restore({ where: { id } }); 
        res.status(200).json({ message: "Company restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring companies", 
            error, 
        }); 
    } 
}; 
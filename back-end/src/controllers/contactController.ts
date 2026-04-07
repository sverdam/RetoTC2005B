import { RequestHandler, Request, Response } from "express";
import { Contact } from "../models/contact";
import { Company } from "../models/company";


// Create new contact
export const createContact: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const contact = { ...req.body };

    Contact.create(contact)
        .then((data: Contact | null) => {
            res.status(200).json({
                status: "success",
                message: "Contact successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a contact. " + err.message,
                payload: null,
            });
        });
};


// Get all contacts
export const getAllContacts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const contacts: Array<Contact> = await Contact.findAll({
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting contacts",
            error
        });
    }
};


// Get contact by id
export const getContactById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const contact: Contact | null = await Contact.findByPk(id, {
            attributes: { exclude: ["companyId"] },
            include: [{ model: Company, attributes: ["id", "name"] }],
        });

        return res.status(200).json(contact);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting contact",
            error
        });
    }
};


// Update contact
export const updateContact: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Contact.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Contact successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the contact.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a contact. " + err.message,
                payload: null,
            });
        });
};


// Delete contact
export const deleteContact: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        await Contact.destroy({ where: { id } });

        res.status(200).json({
            message: "Contact deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting contact",
            error,
        });
    }
};

// Restore contact
export const restoreContact: RequestHandler = async (req: Request, res: Response): Promise<void> => { 
    const id = Number(req.params.id);
    try { 
        await Contact.restore({ where: { id } }); 
        res.status(200).json({ message: "Contact restored" }); 
    } catch (error) { 
        res.status(500).json({ 
            message: "Error restoring contacts", 
            error, 
        }); 
    } 
}; 
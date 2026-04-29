import { RequestHandler, Request, Response } from "express";
import { Product } from "../models/product";
import { Company } from "../models/company";
import { FileModule, FileType } from "../models/fileModule";
import { deleteFileModuleFile, getFileModuleById } from "./fileModuleController";
import { CheckPosBody, CreateOrReplaceFileModule, BuildFileDataForCreate, DeleteFile} from "../services/fileModuleService";
import { error } from "node:console";


// Create new product with FileModule
export const createProductWithFileModule: RequestHandler = async (req: Request, res: Response) => {
    try{

        req.body.type = 'product';

        if (!req.body.companyId || !req.body.position || !req.body.type) {
            return res.status(400).json({
                status: "error",
                message: "companyId, position and type are required.",
                payload: null,
            });
        }
            
        const existingFileModule = await CheckPosBody(
            Number(req.body.companyId),
            Number(req.body.position)
        )
    
        //agregar datos del archivo generado
        const newData = await BuildFileDataForCreate(
            {
                companyId: req.body, 
                position: req.body.position, 
                type: FileType.PRODUCT,
                storedName: null,
                originalName: null,
                path: null,
                mimeType: null,
                size: null
            },
            req.file
        )
        
        const result = await CreateOrReplaceFileModule(existingFileModule, newData);
        
        if (result.data !== null){
            const newFileModule = 'data' in result.data ? result.data.data : result.data;

            try
            {
                const product = {
                    fileModuleId: newFileModule.id,
                    name: req.body.name,
                    description: req.body.description
                }
                
                Product.create(product)
                    .then((data: Product | null) => {
                        res.status(200).json({
                            status: "success",
                            message: "Product successfully created",
                            payload: data,
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status: "error",
                            message: "Something happened creating a product. " + err.message,
                            payload: null,
                        });
                    });
            }
            catch(err: any)
            {
                console.warn("Aborting product creation, destroying file.");
                const existingFileModule: FileModule | null = await FileModule.findByPk(newFileModule.id)
                if (existingFileModule !== null){
                    const result = await DeleteFile(existingFileModule)
                }
            }
        }
        else{
            throw error;
        }

        return res.status(result.action === "created" ? 201: 200).json({
            status: "success",
            message:
                result.action === "created"
                ? "File Module successfully created"
                : "File Module successfully updated",
            payload: result.data
    
        })
    
        }catch (err: any){
            return res.status(500).json({
                status: "error",
                message: "Something happened while creating the File Module. " + err.message,
                payload: null
            })
        } 
}

// Create new product
export const createProduct: RequestHandler = async (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
    }

    const product = { ...req.body };

    Product.create(product)
        .then((data: Product | null) => {
            res.status(200).json({
                status: "success",
                message: "Product successfully created",
                payload: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened creating a product. " + err.message,
                payload: null,
            });
        });
};


// Get all products
export const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const products: Array<Product> = await Product.findAll({
            //attributes: { exclude: ["fileModuleId"] },
            include: [{ model: FileModule, attributes: ["path", "companyId"]}],
        });

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting products",
            error
        });
    }
};


// Get products by id
export const getProductById: RequestHandler = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const product: Product | null = await Product.findByPk(id, {
            //attributes: { exclude: ["fileModuleId"] },
            include: [{ model: FileModule, attributes: ["path", "companyId"]}],
        });

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting product",
            error
        });
    }
};

//Get products by company
export const getProductByCompany: RequestHandler = async (req: Request, res: Response) => {
    try {
        const companyId = Number(req.params.id);
        
        const products: Array<Product> = await Product.findAll({
            //attributes: { exclude: ["fileModuleId"] },
            include: [{ model: FileModule, attributes: ["path"], where: {companyId: companyId}
             }],
        });

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Error getting products",
            error
        });
    }
};


// Update product
export const updateProduct: RequestHandler = (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
    }

    Product.update({ ...req.body }, { where: { id: req.params.id } })
        .then((isUpdated) => {
            if (isUpdated) {
                return res.status(200).json({
                    status: "success",
                    message: "Product successfully updated",
                    payload: { ...req.body },
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: "Something happened updating the product.",
                    payload: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                message: "Something happened updating a product. " + err.message,
                payload: null,
            });
        });
};


// Delete product
export const deleteProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        const product = await Product.findByPk(id, {
            include: [{model: FileModule, attributes: ["id", "path"]}]
        })
        if (product?.fileModule){
        await DeleteFile(product.fileModule)
        }
        await Product.destroy({ where: { id } });

        res.status(200).json({
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error,
        });
    }
};
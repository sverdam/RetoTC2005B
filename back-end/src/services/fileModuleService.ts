import { Json } from "sequelize/types/utils";
import { FileModule } from "../models/fileModule";
import multer from "multer";



//checa si company + position ya existe
export const CheckPosBody = async (companyId: number, position: number) =>{
        const existingFileModule = await FileModule.findOne({
            where: {
                companyId: companyId,
                position: position
            },
        });

    return existingFileModule
} 

//createModule with new data
export const UpdateData = (body: any , file: Express.Multer.File) =>{
    const newData = {
        companyId: Number(body.companyId),
        position: Number(body.position),
        type: body.type,
        storedName: file.filename,
        originalName: file.originalname,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
            }
    return newData
}
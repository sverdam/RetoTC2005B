import { FileModule, FileType} from "../models/fileModule";
import { rm, rename } from 'node:fs/promises';

const fs = require('node:fs');

interface FileData {
  companyId: number;
  position: number;
  type: FileType;
  storedName: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
}



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
export const UpdateData = (oldData: FileData , file: Express.Multer.File) =>{
    const newData = {
        companyId: Number(oldData.companyId),
        position: Number(oldData.position),
        type: oldData.type,
        storedName: file.filename,
        originalName: file.originalname,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
            }
    return newData
}

export const ConstructFinalPath = (type: string, storedName: string) =>{
    let finalPath = ''
    if (type === 'image'){finalPath = `files/images/${storedName}`;}
    else if(type === 'logo'){finalPath = `files/logos/${storedName}`;}
    else if(type === 'document'){finalPath = `files/documents/${storedName}`;}

    else {throw new Error(`Invalid file type: ${type}`);}
    return finalPath;
}

export const MoveFileModule = async (data: FileData) =>{
    const finalPath = await ConstructFinalPath(data.type, data.storedName)
    await rename(data.path, finalPath);
    return finalPath;
}

export const CreateOrReplaceFileModule = async(existingFileModule: FileModule | null, newData: FileData) =>{
    if(existingFileModule){
        try {
                await rm(existingFileModule.path);
            } catch (error){
                try {
                    await rm(newData.path);
                } catch {}
                throw error;
                }
        
        const newPath = await MoveFileModule(newData);
        newData.path = newPath;
        const updated = await existingFileModule.update(newData)

        return {
            action: "updated",
            data: updated
        };
    }
    else{
        const newPath = await MoveFileModule(newData);
        newData.path = newPath;
        const created = await FileModule.create(newData)
        return {
            action: "created",
            data: created
        };
    };
};

export const UpdateFileModule = async() =>{

}
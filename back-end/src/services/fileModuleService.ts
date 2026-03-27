import { FileModule, FileType} from "../models/fileModule";
import { rm, rename } from 'node:fs/promises';

const fs = require('node:fs');

interface FileData {
  companyId: number;
  position: number;
  type: FileType;
  storedName: string | null;
  originalName: string | null;
  path: string | null;
  mimeType: string | null;
  size: number | null;
}
interface FileDataWithFile{
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
export const UpdateData = (oldData: FileData , file?: Express.Multer.File) =>{
    const newData = {
        companyId: Number(oldData.companyId),
        position: Number(oldData.position),
        type: oldData.type,
        storedName: file? file.filename : null,
        originalName: file? file.originalname : null,
        path: file? file.path : null,
        mimeType: file? file.mimetype : null,
        size: file? file.size : null,
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

export const MoveFileModule = async (data: FileDataWithFile) =>{
    const finalPath = await ConstructFinalPath(data.type, data.storedName)
    await rename(data.path, finalPath);
    return finalPath;
}

export const CreateOrReplaceFileModule = async(existingFileModule: FileModule | null, newData: FileData) =>{
    if(existingFileModule) { //update existing module
        if(existingFileModule.path){
            try {
                await rm(existingFileModule.path);
            } catch (error){
                if(newData.path){
                try {
                    await rm(newData.path);
                } catch {}}
                throw error;
                }
        }
    
        if (newData.path && newData.storedName){
            const newPath = await MoveFileModule(newData as FileDataWithFile);
            newData.path = newPath;
        }

        const updated = await existingFileModule.update(newData)

        return {
            action: "updated",
            data: updated
        };
    }
    else{ //create new module
        if (newData.path && newData.storedName){
            const newPath = await MoveFileModule(newData as FileDataWithFile);
            newData.path = newPath;
        }
        const created = await FileModule.create(newData)
        return {
            action: "created",
            data: created
        };
    };
};

export const UpdateFileModule = async() =>{

}
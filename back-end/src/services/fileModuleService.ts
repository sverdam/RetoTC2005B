import { FileModule, FileType} from "../models/fileModule";
import { rm, rename } from 'node:fs/promises';
import path from "node:path";


const fs = require('node:fs');

export interface FileData {
  companyId: number;
  position: number;
  type: FileType;
  storedName: string | null;
  originalName: string | null;
  path: string | null;
  mimeType: string | null;
  size: number | null;
}
export interface FileDataWithFile{
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
export const BuildFileDataForCreate = (body: FileData, file?: Express.Multer.File) =>{

    const newData = {
        companyId:Number(body.companyId),
        position:Number(body.position),
        type: body.type,
        storedName: file? file.filename : null,
        originalName: file? file.originalname : null,
        path: file? file.path : null,
        mimeType: file? file.mimetype : null,
        size: file? file.size : null,
            }
    return newData
}

export const BuildFileDataForUpdate = (body: FileData, oldFile: FileModule , file: Express.Multer.File) =>{

    const newData = {
        companyId: body.companyId? Number(body.companyId) : Number(oldFile.companyId),
        position: body.position? Number(body.position) : Number(oldFile.position),
        type: body.type? body.type : oldFile.type,
        storedName: file.filename,
        originalName:file.originalname,
        path:file.path,
        mimeType:file.mimetype,
        size:file.size,
            }
    return newData
}

export const ChangeFileName = (FileModule: FileData) => {
    const extension = path.extname(FileModule.originalName!)

    if (FileModule.type === 'image'){FileModule.storedName = `img-${FileModule.companyId}-${FileModule.position}${extension}`;}
    else if(FileModule.type === 'logo'){FileModule.storedName =  `logo-${FileModule.companyId}-${FileModule.position}${extension}`;}
    else if(FileModule.type === 'product'){FileModule.storedName =  `product-${FileModule.companyId}-${FileModule.position}${extension}`;}
    else if(FileModule.type === 'document'){FileModule.storedName = `document-${FileModule.companyId}-${FileModule.position}${extension}`;}

    else {throw new Error(`Invalid file type: ${FileModule.type}`);}
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

export const updateFileModuleData = async(existingFileModule: FileModule, data: FileData) => {
    const oldPath = existingFileModule.path 
    if (data.type !== existingFileModule.type && data.type){
        existingFileModule.type = data.type
    }

    if (data.storedName !== existingFileModule.storedName && data.storedName){
        if(!path.extname(data.storedName)&& existingFileModule.originalName){
            data.storedName = `${data.storedName}${Math.floor(Math.random()*10000000)}${path.extname(existingFileModule.originalName)}`
        }
        existingFileModule.storedName = data.storedName
    }
    if (existingFileModule.storedName && oldPath){
        existingFileModule.path = ConstructFinalPath(existingFileModule.type, existingFileModule.storedName)
    }

    if (data.originalName !== existingFileModule.originalName){
        existingFileModule.originalName = data.originalName 
    }

    if(oldPath && existingFileModule.path && oldPath !== existingFileModule.path){
        await rename(oldPath, existingFileModule.path);
    }

    console.log("changed fields:", existingFileModule.changed());
    console.log("before save:", existingFileModule.toJSON());
    const saved = await existingFileModule.save()
    console.log("after save:", saved.toJSON());
    return {
        action: "updated",
        data: saved
    };

}

export const updateFileModuleFile = async(existingFileModule: FileModule, newData: FileData, body?: FileData ) =>{
    if(existingFileModule.path){
        try {
            await rm(existingFileModule.path);
        } 
        catch (error){
            if(newData.path){
                try {
                    await rm(newData.path);
                } catch {}}
                throw error;
        }
    }
        
    if (newData.path && newData.storedName){
        ChangeFileName(newData)
        const newPath = await MoveFileModule(newData as FileDataWithFile);
        newData.path = newPath;
    }
    existingFileModule.companyId = newData.companyId;
    existingFileModule.position = newData.position;
    existingFileModule.type = newData.type;
    existingFileModule.storedName = newData.storedName;
    existingFileModule.originalName = newData.originalName;
    existingFileModule.path = newData.path;
    existingFileModule.mimeType = newData.mimeType;
    existingFileModule.size = newData.size;

    const updated = await existingFileModule.save()
    
    if (body){
        const result  = await updateFileModuleData(existingFileModule, body) //checa el resto del body y lo implementa si fue agregado
        return{
            action: "updated",
            data: result.data
        }
    }

    return {
        action: "updated",
        data: updated
    };
}

export const CreateOrReplaceFileModule = async(existingFileModule: FileModule | null, newData: FileData) =>{
    if(existingFileModule) { //update existing module
        const updated = await updateFileModuleFile(existingFileModule, newData)

        return {
            action: "updated",
            data: updated
        }
    }
    else{ //create new module
        if (newData.path && newData.originalName){
            ChangeFileName(newData)
            const newPath = await MoveFileModule(newData as FileDataWithFile);
            newData.path = newPath;
        }
        const created = await FileModule.create(newData as FileDataWithFile)
        return {
            action: "created",
            data: created
        };
    };
};

export const DeleteFile = async(existingFileModule: FileModule) =>{
    if (existingFileModule.path){
        try{
            await rm(existingFileModule.path);
            existingFileModule.storedName = null
            existingFileModule.originalName = null
            existingFileModule.path = null
            existingFileModule.mimeType = null
            existingFileModule.size = null
            const saved = await existingFileModule.save()

            return {
            action: "updated",
            data: saved
            }
        }catch (error){
            throw error;
        }
    }
    
}
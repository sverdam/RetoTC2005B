import type { FileModuleInput, FileModule } from "clas-types";
import api from ".";
import { AxiosError } from "axios";

export const getFileURLById = (id: number) => {
    const url = `${api.defaults.baseURL}fileModule/files/${id}`;
    console.log(`URL: ${url}`);
    return url;
}


export const getGallery = async (companyId: number) => {
    try {
        const res = await api.get<FileModule[]>(`/fileModule/company/${companyId}/type/image`);
        const links = res.data.map(fileModule => getFileURLById(fileModule.id))
        return links;

    } catch( error ){
        const err = error as AxiosError;
        console.error("Error getting logos: ", err.message);
        throw err;
    }
}

export const getLogos = async () => {
    try {
        const res = await api.get<FileModule[]>("/fileModule/type/logo");
        const links = res.data.map(fileModule => 
            {
                return {src: getFileURLById(fileModule.id), alt: fileModule.type};
            }
        )
        return links;

    } catch( error ){
        const err = error as AxiosError;
        console.error("Error getting logos: ", err.message);
        throw err;
    }
}

export const createFileModule = async (info: FileModuleInput, file: File) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(info)) {
        formData.append(key, value);
    }

    formData.append('file', file);
    
    try{
        const res = await api.post<FileModule>("/fileModule", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res.data;
    } catch(error){
        const err = error as AxiosError;
        console.error("Error creating file: ", err.message);
        throw err;
    }
}

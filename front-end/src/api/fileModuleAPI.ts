import type { FileModuleInput, FileModule } from "clas-types";
import api from ".";
import { AxiosError } from "axios";

export const getFileURLById = (id: number) => {
    const url = `${api.defaults.baseURL}fileModule/files/${id}`;
    console.log(`URL: ${url}`);
    return url;
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
        console.error("Error creating company: ", err.message);
        throw err;
    }
}

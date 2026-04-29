import api from ".";
import { Axios, AxiosError } from "axios";
import type { Certification, NewCertificationInput } from "clas-types";

export const deleteCertification = async (id:number) : Promise<void> => {
    try{
        await api.delete(`/certification/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erro deleting certification: ", err.message);
        throw err;
    }
}
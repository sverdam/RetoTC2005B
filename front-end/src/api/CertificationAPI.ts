import api from ".";
import { AxiosError } from "axios";
import type { Certification, NewCertificationInput } from "clas-types";


export const createCertification = async (data: NewCertificationInput): Promise<Certification> => {
    const { id, ...pro } = data;
    try {
        const res = await api.post<Certification>("/certification", pro);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating certification: ", err.message);
        throw err;
    }
}

export const updateCertification = async (id: number, data: NewCertificationInput): Promise<Certification> => {
    try {
        const res = await api.patch<Certification>(`/certification/${id}`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating certification: ", err.message);
        throw err;
    }
}

export const deleteCertification = async (id: number): Promise<void> => {
    try {
        await api.delete(`/certification/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erro deleting certification: ", err.message);
        throw err;
    }
}
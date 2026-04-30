import api from ".";
import { AxiosError } from "axios";

export const getCompanyFilters = async (companyId: number) => {
    try{
    const res = await api.get(`/companyFilter/company/${companyId}`);
    return res.data; 
    } catch(error) {
        const err = error as AxiosError;
        console.error("Error getting filters company: ", err.message);
        throw err;
    }
}

export const createCompanyFilter = async (companyId: number, filterId: number) => {
    try{
    const res = await api.post(`/companyFilter`, { companyId, filterId });
    return res.data;
    } catch(error) {
        const err = error as AxiosError;
        console.error("Error creating filters company: ", err.message);
        throw err;
    }
}

export const deleteCompanyFilter = async (companyId: number, filterId: number) => {
    try{
    const res = await api.delete(`/companyFilter/company/${companyId}/filter/${filterId}`);
    return res.data;
    } catch(error) {
        const err = error as AxiosError;
        console.error("Error deleting filters company:  ", err.message);
        throw err;
    }
}
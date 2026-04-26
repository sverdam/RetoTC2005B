import api from ".";
import { AxiosError } from "axios";
import type { Company } from "clas-types";


export const getAllCompanies = async (): Promise<Company[]> => {
    try{
        const res = await api.get<Company[]> ("/company");
        console.log(res.data)
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fecthing companies: ", err.message);
        throw err;
    }
}

export const deleteCompany = async (id: number): Promise<Company> => {
    try{
        const res = await api.delete<Company> (`/company/${id}`)
        console.log(res.data)
        return res.data;
    }
    catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting company: ", err.message);
        throw err;
    }
}
import api from ".";
import { Axios, AxiosError } from "axios";
import type { Company, NewCompanyInput } from "clas-types";


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

export const getCompanybyId = async(id: number): Promise<Company> => {
    try{
        const res = await api.get<Company> (`/company/${id}`)
        return res.data;    
    }
    catch(error){
        const err = error as AxiosError;
        console.error("Error getting company: ", err.message);
        throw err;
    }
}

export const createCompany = async(data:NewCompanyInput): Promise<Company> => {
    try{
        const res = await api.post<Company>("/company", data);
        return res.data;
    } catch(error){
        const err = error as AxiosError;
        console.error("Error creating company: ", err.message);
        throw err;
    } 
}

export const updateCompany = async (id: number, data: NewCompanyInput): Promise<Company> => {
    try{
        const res = await api.patch<Company>(`/company/${id}`, data);
        return res.data;
    } catch(error){
        const err = error as AxiosError;
        console.error("Error updating company: ", err.message);
        throw err;
    }
}


import api from ".";
import { AxiosError } from "axios";
import type { Company } from "clas-types";

interface ApiResponse<T> {
    payload: T;
}

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

import api from ".";
import { AxiosError } from "axios";
import type { Company } from "../types/types";

interface ApiResponse<T> {
    payload: T;
}

export const getAllCompanies = async (): Promise<Company[]> => {
    try{
        const res = await api.get<ApiResponse<Company[]>> ("/company");
        const payload = res.data.payload ?? res.data;
        console.log(payload);
        return payload;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching companies: ", err.message);
        throw err;
    }
}

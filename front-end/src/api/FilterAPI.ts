import api from ".";
import { AxiosError } from "axios";
import type { Filter } from "clas-types";

interface ApiResponse<T> {
    payload: T;
}

export const getAllFilters = async (): Promise<Filter[]> => {
    try{
        const res = await api.get<ApiResponse<Filter[]>> ("/filter");
        console.log(res.data.payload)
        return res.data.payload;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fecthing filters: ", err.message);
        throw err;
    }
}
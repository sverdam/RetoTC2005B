import api from ".";
import { AxiosError } from "axios";
import type { Filter } from "clas-types";

export const getAllFilters = async (): Promise<Filter[]> => {
    try {
        const res = await api.get<Filter[]>("/filter");
        //console.log(res.data)
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fecthing filters: ", err.message);
        throw err;
    }
}


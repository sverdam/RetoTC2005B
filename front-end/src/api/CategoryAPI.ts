import api from ".";
import { AxiosError } from "axios";
import type { Category } from "clas-types";


export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const res = await api.get<Category[]>("/category");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fecthing companies: ", err.message);
        throw err;
    }
}
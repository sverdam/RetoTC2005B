import api from ".";
import { Axios, AxiosError } from "axios";
import type { Product } from "clas-types";

export const deleteProduct = async (id: number): Promise<Product> => {
    try{
        const res = await api.delete<Product> (`/product/${id}`)
        console.log(res.data)
        return res.data;
    }
    catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting product: ", err.message);
        throw err;
    }
}
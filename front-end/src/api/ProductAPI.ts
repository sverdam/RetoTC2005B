import api from ".";
import { Axios, AxiosError } from "axios";
import type { NewProductInput, Product, ProductBundleInput } from "clas-types";

export const deleteProduct = async (id: number): Promise<void> => {
    try{
        await api.delete<Product> (`/product/${id}`)
    }
    catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting product: ", err.message);
        throw err;
    }
}


export const createProductAutomaticFile = async (info: ProductBundleInput) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(info)) {
        formData.append(key, value);
    }

    try{
        const res = await api.post<Product>("/product/withFile", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res.data;
    } catch(error){
        const err = error as AxiosError;
        console.error("Error creating file: ", err.message);
        throw err;
    }
}


export const createProduct = async (data:NewProductInput): Promise<Product> => {
    const {id, ...pro} = data;
    try{
        const res = await api.post<Product>("/product", pro);
        return res.data;
    } catch(error){
        const err = error as AxiosError;
        console.error("Error creating product: ", err.message);
        throw err;
    }
}

export const updateProduct = async (id: number, data:NewProductInput): Promise<Product> => {
    try{
        const res = await api.patch<Product>(`/product/${id}`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating product: ", err.message);
        throw err;
    }
}
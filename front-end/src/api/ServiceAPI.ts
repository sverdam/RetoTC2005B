import api from ".";
import { AxiosError } from "axios";
import type { NewProductInput, Service } from "clas-types";

export const deleteService = async (id: number): Promise<void> => {
    try {
        await api.delete<Service>(`/service/${id}`)
    }
    catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting service: ", err.message);
        throw err;
    }
}

export const createService = async (data: NewProductInput): Promise<Service> => {
    const { id, ...pro } = data;
    try {
        const res = await api.post<Service>("/service", pro);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating service: ", err.message);
        throw err;
    }
}

export const updateService = async (id: number, data: NewProductInput): Promise<Service> => {
    try {
        const res = await api.patch<Service>(`/service/${id}`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating service: ", err.message);
        throw err;
    }
}
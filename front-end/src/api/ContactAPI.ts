import api from ".";
import { Axios, AxiosError } from "axios";
import type { Contact, NewContactInput } from "clas-types";

export const createContact = async (data: NewContactInput): Promise<Contact> => {
    try {
        const res = await api.post<Contact>("/contact", data);
        return res.data;
    } catch(error) {
        const err = error as AxiosError;
        console.error("Error creating contact: ", err.message);
        throw err;
    }
}

export const updateContact = async (id:number, data:NewContactInput): Promise<Contact> => {
    try{
        const res = await api.patch<Contact>("/contact", data);
        return res.data;
    } catch (error) {
         const err = error as AxiosError;
         console.error("Error updating contact: ", err.message);
         throw err;
    }
}

export const deleteContact = async (id:number) : Promise<void> => {
    try{
        await api.delete(`/contact/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erro deleting contact: ", err.message);
        throw err;
    }
}
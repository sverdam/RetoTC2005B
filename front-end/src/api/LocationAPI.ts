import api from ".";
import { AxiosError } from "axios";
import type { Location, NewLocationInput } from "clas-types";



export const createLocation = async (data: NewLocationInput): Promise<Location> => {
    const {id, ...pro} = data;
    try {
        console.log("Location: ");
        console.log(pro)
        const res = await api.post<Location>("/location", pro);
        return res.data;
    } catch(error) {
        const err = error as AxiosError;
        console.error("Error creating location: ", err.message);
        throw err;
    }
}
export const updateLocation = async (id:number, data:NewLocationInput): Promise<Location> => {
    try{
        const res = await api.patch<Location>(`/location/${id}`, data);
        return res.data;
    } catch (error) {
         const err = error as AxiosError;
         console.error("Error updating location: ", err.message);
         throw err;
    }
}
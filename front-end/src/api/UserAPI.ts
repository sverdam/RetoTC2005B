import api from ".";
import { AxiosError } from "axios";
import type { User } from "clas-types";

interface ApiResponse<T> {
    payload: T;
}

export const getAllUsers = async (): Promise<User[]> => {
    try{
        const res = await api.get<ApiResponse<User[]>> ("/user");
        console.log(res.data.payload)
        return res.data.payload;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fecthing users: ", err.message);
        throw err;
    }
}

export const deleteUser = async (id: number): Promise<User> => {
    try{
        const res = await api.delete<ApiResponse<User>> ("/user/")
        console.log(res.data.payload)
        return res.data.payload;
    }
    catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting users: ", err.message);
        throw err;
    }
}
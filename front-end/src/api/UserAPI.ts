import api from ".";
import { AxiosError } from "axios";
import type { NewUserInput, User } from "clas-types";

interface ApiResponse<T> {
    payload: T;
}

export const getAllUsers = async (): Promise<User[]> => {
    try{
        const res = await api.get<User[]> ("/user");
        console.log(res.data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fecthing users: ", err.message);
        throw err;
    }
}

export const deleteUser = async (id: number): Promise<User> => {
    try{
        const res = await api.delete<User> (`/user/${id}`)
        console.log(res.data)
        return res.data;
    }
    catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting users: ", err.message);
        throw err;
    }
}

export const createUser = async (data: NewUserInput): Promise<User> => {
  try {
    const res = await api.post<User>("/user", data);

    return res.data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error creating user:", err.message);

    throw err;
  }
};

export const updateUser = async (id: number, data: NewUserInput): Promise<User> => {
    try {
        const res = await api.patch<User>(`/user/${id}`, data);

        return res.data;
    } catch (error){
        const err = error as AxiosError;

        console.error("Error updating user:", err.message)

        throw err;
    }
}

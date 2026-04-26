import type { LoginUser, UserProfile } from "clas-types";
import api from ".";
import { AxiosError } from "axios";

export const login = async (data: LoginUser) : Promise <any> => {
  try {
    const res = await api.post<any>("/auth/login", data);

    return res.data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error logging in", err.message);

    throw err;
  }
}

export const logout = async () : Promise <any> => {
  try {
    const res = await api.post<any>("/auth/logout");

    return res.data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error logging out:", err.message);

    throw err;
  }
}

export const getProfile = async() : Promise<UserProfile> => {
    try {
        const res = await api.get<any>("/auth/profile");
        console.log(res.data.payload);
        return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error getting profile:", err.message);

    throw err;
  }
}
import api from ".";
import { AxiosError } from "axios";
import type { LandingPage } from 'clas-types'

export const getLandingPage = async (): Promise<LandingPage> => {
    try {
        const res = await api.get<LandingPage> (`/landing`);
        console.log(res.data);
        return res.data;
    }catch(error)
    {
        const err = error as AxiosError;
        console.error("Error fetching data: ", err.message);
        throw err;
    }
}
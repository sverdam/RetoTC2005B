import api from ".";

export const getFileById = (id: number) => {
    return `${api.defaults.baseURL}/fileModule/files/${id}`;
}
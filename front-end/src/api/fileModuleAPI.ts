import api from ".";

export const getFileURLById = (id: number) => {
    const url = `${api.defaults.baseURL}fileModule/files/${id}`;
    console.log(`URL: ${url}`);
    return url;
}
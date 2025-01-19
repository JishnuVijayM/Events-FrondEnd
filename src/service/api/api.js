import axiosInstance from "../axios/axiosInstance"

export const getRole = async (id) => {
    try {
        const res = await axiosInstance.get(`/role/getRole/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const getAllRole = async () => {
    try {
        const res = await axiosInstance.get(`/role/getRoles`)
        return res.data
    } catch (error) {
        return error
    }
}

export const createRole = async (data) => {
    try {
        const res = await axiosInstance.post(`/role/createRole`, data)
        return res
    } catch (error) {
        return error
    }
}

export const deleteApi = async (url) => {
    try {
        const res = await axiosInstance.delete(url)
        return res;
    } catch (error) {
        return error
    }
}

export const editRole = async (id, data) => {
    try {
        const res = await axiosInstance.put(`/role/editRole/${id}`, data)
        return res
    } catch (error) {
        return error
    }
}

//user

export const getAllUser = async () => {
    try {
        const res = await axiosInstance.get(`/user/getUsers`)
        return res.data
    } catch (error) {
        return error
    }
}

export const createUser = async (data, headers = {}) => {
    try {
        const res = await axiosInstance.post(`/user/createUser`, data, headers);
        return res;
    } catch (error) {
        return error;
    }
};


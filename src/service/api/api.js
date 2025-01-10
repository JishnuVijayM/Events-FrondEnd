import axiosInstance from "../axios/axiosInstance"

export const getRole = async (id) => {
    try {
        const res = await axiosInstance.get(`/admin/getRole/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const getAllRole = async () => {
    try {
        const res = await axiosInstance.get(`/admin/getRoles`)
        return res
    } catch (error) {
        return error
    }
}

export const createRole = async (data) => {
    try {
        const res = await axiosInstance.post(`/admin/createRole`,data)
        return res
    } catch (error) {
        return error
    }
}
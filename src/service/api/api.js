import axiosInstance from "../axios/axiosInstance"

export const getRole = async(id) => {
    try {
        const res = await axiosInstance.get(`/admin/getRole/${id}`)
        return res
    } catch (error) {
        return error
    }
} 
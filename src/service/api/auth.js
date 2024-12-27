import axiosInstance from "../axios/axiosInstance"

export const login = async (data) => {
    try {
        const response = await axiosInstance.post(`/adminAuth/login`, data)
        return response

    } catch (error) {
        return error
    }
}
import axiosInstance from "../axios/axiosInstance"

export const login = async (data) => {
    try {
        const response = await axiosInstance.post(`/adminAuth/login`, data)
        return response

    } catch (error) {
        return error
    }
}

export const forgotPassword = async (data) => {
    try {
        const response = await axiosInstance.post(`/adminAuth/forgot-password`, data)
        return response

    } catch (error) {
        return error
    }
}

export const resetPassword = async (data,token) => {
    try {
        const response = await axiosInstance.post(`/adminAuth/reset-password/${token}`, data)
        return response

    } catch (error) {
        return error
    }
}


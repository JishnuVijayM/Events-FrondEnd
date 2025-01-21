import axiosInstance from "../axios/axiosInstance"

export const viewRole = async (id) => {
    try {
        const res = await axiosInstance.get(`/role/viewRole/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const getAllRole = async () => {
    try {
        const res = await axiosInstance.get(`/role/getAllRoles`)
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

export const getRoles = async () => {
    try {
        const res = await axiosInstance.get(`/role/getRoles`)
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
        return res
    } catch (error) {
        return error;
    }
};

export const viewUser = async (id) => {
    try {
        const res = await axiosInstance.get(`/user/viewUser/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const getCountry = async () => {
    try {
        const res = await axiosInstance.get(`https://api.countrystatecity.in/v1/countries`, {
            headers: {
                'X-CSCAPI-KEY': import.meta.env.VITE_DROPDOWN_API_KEY,
            }
        })
        return res
    } catch (error) {
        return error
    }
}

export const getState = async (country) => {
    try {
        const res = await axiosInstance.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
            headers: {
                'X-CSCAPI-KEY': import.meta.env.VITE_DROPDOWN_API_KEY,
            }
        })
        return res
    } catch (error) {
        return error
    }
}

export const getCity = async (country,state) => {
    try {
        const res = await axiosInstance.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
            headers: {
                'X-CSCAPI-KEY': import.meta.env.VITE_DROPDOWN_API_KEY,
            }
        })
        return res
    } catch (error) {
        return error
    }
}
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

export const editUser = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/user/updateUser/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

//company
export const createCompany = async (data) => {
    try {
        const res = await axiosInstance.post(
            `/company/createCompany`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllCompanies = async () => {
    try {
        const res = await axiosInstance.get(`/company/getCompanies`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewCompany = async (id) => {
    try {
        const res = await axiosInstance.get(`/company/viewCompany/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editCompany = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/company/updateCompany/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getCompanyList = async () => {
    try {
        const res = await axiosInstance.get(`/company/getCompanyList`)
        return res
    } catch (error) {
        return error
    }
}


//job
export const createJob = async (data) => {
    try {
        const res = await axiosInstance.post(`/job/createJob`, data)
        return res
    } catch (error) {
        return error
    }
}

export const getAllJobs = async () => {
    try {
        const res = await axiosInstance.get(`/job/getJobs`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewJob = async (id) => {
    try {
        const res = await axiosInstance.get(`/job/viewJob/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editJob = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/job/updateJob/${id}`,data);
        return res;
    } catch (error) {
        return error;
    }
};

//event
export const createEvent = async (data) => {
    try {
        const res = await axiosInstance.post(
            `/event/createEvent`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllEvents = async () => {
    try {
        const res = await axiosInstance.get(`/event/getEvents`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewEvent = async (id) => {
    try {
        const res = await axiosInstance.get(`/event/viewEvent/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editEvent = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/event/updateEvent/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getEventList = async () => {
    try {
        const res = await axiosInstance.get(`/event/getEventList`)
        return res
    } catch (error) {
        return error
    }
}

//event user
export const createEventUser = async (data) => {
    try {
        const res = await axiosInstance.post(
            `/event/createEventUser`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllEventUsers = async () => {
    try {
        const res = await axiosInstance.get(`/event/getEventUsers`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewEventUser = async (id) => {
    try {
        const res = await axiosInstance.get(`/event/viewEventUser/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editEventUser = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/event/updateEventUser/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        return error;
    }
};

//static pages
export const createPage = async (data) => {
    try {
        const res = await axiosInstance.post(`/page/createPage`, data)
        return res
    } catch (error) {
        return error
    }
}

export const getAllPages = async () => {
    try {
        const res = await axiosInstance.get(`/page/getPages`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewPage = async (id) => {
    try {
        const res = await axiosInstance.get(`/page/viewPage/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editPage = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/page/updatePage/${id}`,data);
        return res;
    } catch (error) {
        return error;
    }
};

//faq
export const createFaq = async (data) => {
    try {
        const res = await axiosInstance.post(`/faq/createFaq`, data)
        return res
    } catch (error) {
        return error
    }
}

export const getAllFaq = async () => {
    try {
        const res = await axiosInstance.get(`/faq/getAllFaq`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewFaq = async (id) => {
    try {
        const res = await axiosInstance.get(`/faq/viewFaq/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editFaq = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/faq/updateFaq/${id}`,data);
        return res;
    } catch (error) {
        return error;
    }
};

//Notification
export const createNotify = async (data) => {
    try {
        const res = await axiosInstance.post(`/notify/createNotify`, data)
        return res
    } catch (error) {
        return error
    }
}

export const getAllNotify = async () => {
    try {
        const res = await axiosInstance.get(`/notify/getAllNotify`)
        return res.data
    } catch (error) {
        return error
    }
}

export const viewNotify = async (id) => {
    try {
        const res = await axiosInstance.get(`/notify/viewNotify/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const editNotify = async (id, data) => {
    try {
        const res = await axiosInstance.put(
            `/notify/updateNotify/${id}`,data);
        return res;
    } catch (error) {
        return error;
    }
};
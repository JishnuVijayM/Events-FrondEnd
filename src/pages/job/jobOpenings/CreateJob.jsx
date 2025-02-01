import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import DateInput from '../../../components/DateInput';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelectInput from '../../../components/MultiSelectInput';
import { Error, Success, Warning } from '../../../components/Notification';
import { createJob, editJob, getCity, getCompanyList, viewJob } from '../../../service/api/api';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';
import Loader from '../../../components/Loader';

const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job Title is required'),
    company: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Location is required'),
    skill: Yup.array().min(1, 'At least one skill is required').required('Required Skill is required'),
    salaryRange: Yup.string().required('Salary Range is required'),
    employmentType: Yup.string().required('Employment Type is required'),
    experience: Yup.string().required('Experience is required'),
    eduLevel: Yup.string().required('Education Level is required'),
    vacancy: Yup.number().required('Vacancy is required').positive('Vacancy must be a positive number').integer(),
    deadline: Yup.date().required('Application Deadline is required'),
    status: Yup.string().required('Job Status is required')
});

function CreateJob() {
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState([])
    const [location, setLocation] = useState([])
    const dispatch = useDispatch();
    const [skill, setSkill] = useState([
        { label: "React", value: "react" },
        { label: "Node.js", value: "nodejs" },
        { label: "MongoDB", value: "mongodb" },
        { label: "Docker", value: "docker" },
    ]);
    const [education, setEducation] = useState([
        { label: "High School", value: "high_school" },
        { label: "Associate's Degree", value: "associates_degree" },
        { label: "Bachelor's Degree", value: "bachelors_degree" },
        { label: "Master's Degree", value: "masters_degree" },
        { label: "Other", value: "other" }
    ]);
    const [employementType, setEmploymentType] = useState([
        { label: "Full-Time", value: "full_time" },
        { label: "Part-Time", value: "part_time" },
        { label: "Contract", value: "contract" },
        { label: "Intern", value: "intern" },
        { label: "Freelancer", value: "freelancer" },
        { label: "Remote", value: "remote" },
        { label: "Temporary", value: "temporary" },
        { label: "Consultant", value: "consultant" },
        { label: "Seasonal", value: "seasonal" }
    ]);


    const form = useFormik({
        initialValues: {
            jobTitle: '',
            company: '',
            location: '',
            skill: [],
            salaryRange: '',
            employmentType: '',
            experience: '',
            eduLevel: '',
            vacancy: '',
            deadline: null,
            status: 'Active'
        },
        validationSchema,
        onSubmit: async (values) => {

            setIsLoading(true);
            setIsSubmitting(true)

            try {

                let response

                if (editItem.isEdit) {
                    response = await editJob(editItem.id, values);
                } else {
                    response = await createJob(values);
                }

                console.log('Full response:', response);

                if (response.status === 400) {
                    Warning(response.response?.data?.message || 'An error occurred!');
                    return;
                }

                if (response.status === 404) {
                    Warning('An error occurred!');
                    return;
                }

                if (response.status === 201) {
                    Success(response.data.message);
                    dispatch(setActiveTab("list"));
                    return;
                }

            } catch (error) {
                console.log('job e', error);

                Error(`Failed to ${editItem.isEdit ? 'update' : 'create'} job`);
            } finally {
                setIsSubmitting(false)
                setIsLoading(false);
            }

        }
    });

    const fetchData = async () => {
        try {
            const [companyRes, cityRes] = await Promise.all([getCompanyList(), getCity("IN", "KL")]);
    
            if (companyRes?.status === 200) {
                setCompany(companyRes.data.data);
            }
    
            if (cityRes?.status === 200) {
                const updatedData = cityRes?.data?.map(item => ({
                    value: item.name,
                    label: item.name
                }));
                setLocation(updatedData);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const getJobData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewJob(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;
                form.setValues({
                    jobTitle: data.jobTitle || '',
                    company: data.company || '',
                    location: data.location || '',
                    skill: data.skill || [],
                    salaryRange: data.salaryRange || '',
                    employmentType: data.employmentType || '',
                    experience: data.experience || '',
                    eduLevel: data.eduLevel || '',
                    vacancy: data.vacancy || '',
                    deadline: data.deadline || '',
                    status: data.status || '',
                });

            } else {
                dispatch(setActiveTab("list"));
                Error(response.data?.message || 'Unexpected error occurred');
                console.error('Error fetching user:');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch job details');
            console.error('Error fetching user:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id, editItem?.id]);

    useEffect(() => {
        if ((viewItem?.id && (viewItem.isView || viewItem.isEdit)) || (editItem?.id && (editItem.isView || editItem.isEdit))) {
            getJobData();
        }
    }, [viewItem, editItem]);



    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5">
                <div className="w-full flex gap-2">
                    <TextInput
                        disabled={viewItem.isView}
                        required
                        label="Job Title"
                        placeholder="Enter job title"
                        width="w-1/4"
                        name="jobTitle"
                        value={form.values.jobTitle}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.jobTitle && form.errors.jobTitle}
                    />
                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Company Name"
                        placeholder="Company"
                        width="w-1/4"
                        name="company"
                        data={company}
                        value={form.values.company}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.company && form.errors.company}
                    />
                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Location"
                        placeholder="Location"
                        width="w-1/4"
                        name="location"
                        data={location}
                        value={form.values.location}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.location && form.errors.location}
                    />
                    <MultiSelectInput
                        disabled={viewItem.isView}
                        required
                        label="Required Skill"
                        placeholder="Skill"
                        width="w-1/4"
                        name="skill"
                        data={skill}
                        value={form.values.skill}
                        onChange={(selectedSkills) => form.setFieldValue('skill', selectedSkills)}
                        onBlur={form.handleBlur}
                        error={form.touched.skill && form.errors.skill}
                    />
                </div>
                <div className="w-full flex gap-2 mt-3">
                    <TextInput
                        disabled={viewItem.isView}
                        required
                        label="Salary Range"
                        placeholder="Enter salary"
                        width="w-1/4"
                        name="salaryRange"
                        value={form.values.salaryRange}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.salaryRange && form.errors.salaryRange}
                    />
                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Employment Type"
                        placeholder="Type"
                        width="w-1/4"
                        name="employmentType"
                        data={employementType}
                        value={form.values.employmentType}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.employmentType && form.errors.employmentType}
                    />
                    <TextInput
                        required
                        disabled={viewItem.isView}
                        label="Experience Required"
                        placeholder="Enter experience"
                        width="w-1/4"
                        name="experience"
                        value={form.values.experience}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.experience && form.errors.experience}
                    />
                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Education Level"
                        placeholder="Level"
                        width="w-1/4"
                        name="eduLevel"
                        data={education}
                        value={form.values.eduLevel}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.eduLevel && form.errors.eduLevel}
                    />
                </div>
                <div className="w-full flex gap-2 mt-3 pe-7">
                    <TextInput
                        disabled={viewItem.isView}
                        type={'number'}
                        required
                        label="Vacancy"
                        placeholder="Enter vacancy"
                        width="w-1/4"
                        name="vacancy"
                        value={form.values.vacancy}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.vacancy && form.errors.vacancy}
                    />
                    <DateInput
                        disabled={viewItem.isView}
                        onChange={(e) => form.setFieldValue('deadline', e.target.value)}
                        width="w-1/4"
                        value={form.values.deadline ? form.values.deadline.split('T')[0] : ''}
                        required
                        label="Application Deadline"
                        name="deadline"
                        error={form.touched.deadline && form.errors.deadline}
                    />
                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Job Status"
                        placeholder="Status"
                        width="w-1/4"
                        name="status"
                        data={[
                            { label: "Active", value: "Active" },
                            { label: "Inactive", value: "Inactive" },
                        ]}
                        value={form.values.status}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.status && form.errors.status}
                    />
                </div>
                <div className="flex w-full mt-4 justify-center">
                    <Reset className="me-1" type="reset" disabled={isSubmitting || viewItem.isView}
                        onClick={form.handleReset} />
                    <Save className="ms-1" label={editItem.isEdit ? "Update" : "Save"} type="submit" disabled={isSubmitting || viewItem.isView || !form.dirty} />

                </div>
            </form>
        </Loader>
    );
}

export default CreateJob;
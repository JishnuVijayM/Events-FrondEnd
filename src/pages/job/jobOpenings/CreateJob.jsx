import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import DateInput from '../../../components/DateInput';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job Title is required'),
    company: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Location is required'),
    skill: Yup.string().required('Required Skill is required'),
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

    const form = useFormik({
        initialValues: {
            jobTitle: '',
            company: '',
            location: '',
            skill: '',
            salaryRange: '',
            employmentType: '',
            experience: '',
            eduLevel: '',
            vacancy: '',
            deadline: null,
            status: 'Active'
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form Data:', values);
        }
    });

    return (
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
                    data={[{ label: "test", value: "test" },
                    { label: "t1", value: "t1" }
                    ]}
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
                    data={[{ label: "test", value: "test" },
                    { label: "t1", value: "t1" }
                    ]}
                    value={form.values.location}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.location && form.errors.location}
                />
                <SelectInput
                    disabled={viewItem.isView}
                    required
                    label="Required Skill"
                    placeholder="Skill"
                    width="w-1/4"
                    name="skill"
                    data={[{ label: "test", value: "test" },
                    { label: "t1", value: "t1" }
                    ]}
                    value={form.values.skill}
                    onChange={form.handleChange}
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
                    data={[{ label: "test", value: "test" },
                    { label: "t1", value: "t1" }
                    ]}
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
                    data={[{ label: "test", value: "test" },
                    { label: "t1", value: "t1" }
                    ]}
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
                    onChange={(date) => form.setFieldValue('deadline', date)}
                    width="w-1/4"
                    value={form.values.deadline}
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

            </div>        </form>
    );
}

export default CreateJob;
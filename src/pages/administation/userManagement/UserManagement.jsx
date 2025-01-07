import React from 'react'
import Tab from '../../../components/Tab'
import Table from '../../../components/Table';

const UserManagement = () => {

    const data = [
        { id: 1, name: 'John Doe', age: 28, city: 'New York', occupation: 'Engineer', salary: 70000 },
        { id: 2, name: 'Jane Smith', age: 32, city: 'Los Angeles', occupation: 'Designer', salary: 75000 },
        { id: 3, name: 'Samuel Green', age: 25, city: 'Chicago', occupation: 'Teacher', salary: 50000 },
        { id: 4, name: 'Emily Johnson', age: 30, city: 'Houston', occupation: 'Doctor', salary: 120000 },
        { id: 5, name: 'Michael Brown', age: 35, city: 'Seattle', occupation: 'Architect', salary: 85000 },
        { id: 6, name: 'Linda Davis', age: 29, city: 'Denver', occupation: 'Engineer', salary: 68000 },
        { id: 7, name: 'Chris Wilson', age: 40, city: 'Miami', occupation: 'Manager', salary: 95000 },
        { id: 8, name: 'Sarah Martinez', age: 26, city: 'Phoenix', occupation: 'Nurse', salary: 60000 },
        { id: 9, name: 'David Clark', age: 33, city: 'Dallas', occupation: 'Chef', salary: 48000 },
        { id: 10, name: 'Emma Lopez', age: 31, city: 'San Diego', occupation: 'Photographer', salary: 52000 },
        { id: 11, name: 'Joshua Harris', age: 27, city: 'Boston', occupation: 'Writer', salary: 55000 },
        { id: 12, name: 'Sophia Lewis', age: 36, city: 'Austin', occupation: 'Pilot', salary: 110000 },
        { id: 13, name: 'Daniel Walker', age: 39, city: 'Portland', occupation: 'Actor', salary: 85000 },
        { id: 14, name: 'Olivia Hall', age: 23, city: 'Atlanta', occupation: 'Dancer', salary: 45000 },
        { id: 15, name: 'Matthew Young', age: 34, city: 'Orlando', occupation: 'Musician', salary: 57000 },
        { id: 16, name: 'Isabella King', age: 24, city: 'Las Vegas', occupation: 'Artist', salary: 49000 },
        { id: 17, name: 'Andrew Scott', age: 41, city: 'Nashville', occupation: 'Director', salary: 100000 },
        { id: 18, name: 'Grace Wright', age: 22, city: 'San Antonio', occupation: 'Intern', salary: 35000 },
        { id: 19, name: 'James Adams', age: 37, city: 'Salt Lake City', occupation: 'Lawyer', salary: 130000 },
        { id: 20, name: 'Mia Perez', age: 38, city: 'Columbus', occupation: 'Scientist', salary: 125000 },
    ];

    const columnHeaders = [
        { key: 'id', label: 'ID', size: 50 },
        { key: 'name', label: 'Name', size: 150 },
        { key: 'age', label: 'Age', size: 100 },
        { key: 'city', label: 'City', size: 150 },
        { key: 'occupation', label: 'Occupation', size: 150 },
        { key: 'salary', label: 'Salary ($)', size: 150 },
    ];

    const tabContent = {
        list: <Table data={data}
            columnHeaders={columnHeaders}
            exportFileName="User" />,
        user: <p>New User</p>,
    };

    const tabs = [
        { id: "list", label: "User List" },
        { id: "user", label: "New User" },
    ];
    return (
        <div>
            <Tab pageName="User Management" tabs={tabs} tabContent={tabContent} />
        </div>
    )
}

export default UserManagement
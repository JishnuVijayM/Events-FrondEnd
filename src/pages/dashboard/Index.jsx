import React from 'react';
import TableDemo from '../../components/TableDemo';
import Table from '../../components/Table';

function Dashboard() {
    const demoData = [
        { id: 1, firstName: 'John', lastName: 'Doe', company: 'Tech Innovators', city: 'San Francisco', country: 'USA' },
        { id: 2, firstName: 'Emma', lastName: 'Smith', company: 'Healthify', city: 'Toronto', country: 'Canada' },
        { id: 3, firstName: 'Liam', lastName: 'Brown', company: 'EduCare', city: 'London', country: 'UK' },
        { id: 4, firstName: 'Sophia', lastName: 'Taylor', company: 'Eco World', city: 'Berlin', country: 'Germany' },
        { id: 5, firstName: 'William', lastName: 'Jones', company: 'FinTrack', city: 'Sydney', country: 'Australia' },
        { id: 6, firstName: 'Olivia', lastName: 'Miller', company: 'Green Energy', city: 'Copenhagen', country: 'Denmark' },
        { id: 7, firstName: 'James', lastName: 'Anderson', company: 'Soft Solutions', city: 'Mumbai', country: 'India' },
        { id: 8, firstName: 'Ava', lastName: 'Martinez', company: 'Global Media', city: 'Seoul', country: 'South Korea' },
        { id: 9, firstName: 'Lucas', lastName: 'Clark', company: 'Travel Explore', city: 'Cape Town', country: 'South Africa' },
        { id: 10, firstName: 'Charlotte', lastName: 'Davis', company: 'Art & Design', city: 'Rome', country: 'Italy' },
        { id: 11, firstName: 'Benjamin', lastName: 'Walker', company: 'Visionary Labs', city: 'Los Angeles', country: 'USA' },
        { id: 12, firstName: 'Mia', lastName: 'Hernandez', company: 'Innovate Now', city: 'Madrid', country: 'Spain' },
        { id: 13, firstName: 'Ethan', lastName: 'Hall', company: 'ProServe', city: 'Stockholm', country: 'Sweden' },
        { id: 14, firstName: 'Amelia', lastName: 'Lopez', company: 'Foodie Hub', city: 'Mexico City', country: 'Mexico' },
        { id: 15, firstName: 'Logan', lastName: 'Allen', company: 'Tech Synergy', city: 'Singapore', country: 'Singapore' },
        { id: 16, firstName: 'Isabella', lastName: 'Young', company: 'Fashion Forward', city: 'Tokyo', country: 'Japan' },
        { id: 17, firstName: 'Henry', lastName: 'King', company: 'Sports Life', city: 'Melbourne', country: 'Australia' },
        { id: 18, firstName: 'Grace', lastName: 'Wright', company: 'Bright Minds', city: 'Amsterdam', country: 'Netherlands' },
        { id: 19, firstName: 'Alexander', lastName: 'Scott', company: 'NextGen', city: 'Vienna', country: 'Austria' },
        { id: 20, firstName: 'Harper', lastName: 'Evans', company: 'Eco Life', city: 'Zurich', country: 'Switzerland' },
    ];


    // sampleData.js
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
    


    const handleEdit = (row) => {
        console.log('Edit row:', row);
        alert(row);
    };

    const handleDelete = (row) => {
        console.log('Delete row:', row);
    };

    return (
        <div className='h-auto bg-slate-950 p-10'>
            <Table
                data={data}
                columnHeaders={columnHeaders}
                // onEdit={handleEdit}
                // onDelete={handleDelete}
                exportFileName="Role"
            />
        </div>
    );
}

export default Dashboard;

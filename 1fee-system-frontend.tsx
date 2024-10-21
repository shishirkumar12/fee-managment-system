import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'students':
        return <Students />;
      case 'fees':
        return <Fees />;
      case 'payments':
        return <Payments />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">School Fee Management</h1>
        <ul className="flex space-x-4">
          <li><button onClick={() => setCurrentPage('home')} className="text-blue-500 hover:text-blue-700">Home</button></li>
          <li><button onClick={() => setCurrentPage('students')} className="text-blue-500 hover:text-blue-700">Students</button></li>
          <li><button onClick={() => setCurrentPage('fees')} className="text-blue-500 hover:text-blue-700">Fees</button></li>
          <li><button onClick={() => setCurrentPage('payments')} className="text-blue-500 hover:text-blue-700">Payments</button></li>
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
};

const Home = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Welcome to School Fee Management System</h2>
    <p>Manage students, fees, and payments efficiently.</p>
  </div>
);

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', grade: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNewStudent({ name: '', grade: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Students</h2>
      <form onSubmit={addStudent} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Student</button>
      </form>
      <ul>
        {students.map(student => (
          <li key={student._id} className="mb-2">{student.name} - Grade {student.grade}</li>
        ))}
      </ul>
    </div>
  );
};

const Fees = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Fees</h2>
    <p>Fees management functionality to be implemented.</p>
  </div>
);

const Payments = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Payments</h2>
    <p>Payments management functionality to be implemented.</p>
  </div>
);

export default App;

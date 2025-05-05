import React, { useEffect, useState } from 'react';
import axios from '../../utilities/axios';
import './Dashboard.css';

function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('doctors/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctorData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Doctor Dashboard</h2>
      <div className="dashboard-list">
        {doctorData.map((doctor) => (
          <div className="dashboard-card" key={doctor.user.id}>
            <p><strong>Name:</strong> {doctor.user.username}</p>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorDashboard;

import React, { useEffect, useState } from 'react';
import axios from '../axios';

function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    // Assuming you have an endpoint for doctor data
    axios.get('doctors/')
      .then(response => {
        setDoctorData(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor data', error);
      });
  }, []);

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <ul>
        {doctorData.map((doctor) => (
          <li key={doctor.user.id}>{doctor.user.username} - {doctor.specialty}</li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;

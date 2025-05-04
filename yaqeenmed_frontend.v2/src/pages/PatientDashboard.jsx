import React, { useEffect, useState } from 'react';
import axios from '../axios';

function PatientDashboard() {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    // Assuming you have an endpoint for patient data
    axios.get('patients/')
      .then(response => {
        setPatientData(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient data', error);
      });
  }, []);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <ul>
        {patientData.map((patient) => (
          <li key={patient.id}>{patient.user.username} - {patient.age} years old</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDashboard;

import sendRequest from './sendRequest';

// Fetch all patients
export function getAllPatients() {
  return sendRequest('/patients/');  // Adjust the endpoint as per your actual API
}

// Fetch details of a specific patient
export function getPatientDetails(id) {
  return sendRequest(`/patients/${id}/`);  // Specific patient details
}

// Create a new patient profile
export function createPatientProfile(data) {
  return sendRequest('/patients/', 'POST', data);  // Post new patient profile
}

// Update an existing patient profile
export function updatePatientProfile(id, data) {
  return sendRequest(`/patients/${id}/`, 'PUT', data);  // Update specific patient profile
}

// Delete a patient profile
export function deletePatientProfile(id) {
  return sendRequest(`/patients/${id}/`, 'DELETE');  // Delete patient profile
}

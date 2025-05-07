import sendRequest from './sendRequest';

// Existing functions
export function getAllOrders() {
  return sendRequest('/orders/');  
}

export function getOrderDetails(id) {
  return sendRequest(`/orders/${id}/`);  
}

export function createOrder(data) {
  return sendRequest('/orders/', 'POST', data); 
}

export function updateOrder(id, data) {
  return sendRequest(`/orders/${id}/`, 'PUT', data);  
}

export function deleteOrder(id) {
  return sendRequest(`/orders/${id}/`, 'DELETE');  
}

// New function to fetch patient requests
export function getAllPatientRequests() {
  return sendRequest('/patient-requests/');  // Modify the endpoint as needed
}

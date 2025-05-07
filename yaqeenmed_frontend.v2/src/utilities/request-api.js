
export async function getPostedRequests() {
    const token = localStorage.getItem('token');  
    const response = await fetch('http://127.0.0.1:8000/api/patient-requests/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch posted requests');
    }
  
    return await response.json();  
  }
  
import sendRequest from './sendRequest'; 


export async function loginUser(credentials) {
    const data = await sendRequest('api/token/', 'POST', credentials);  
    return {
      access: data.access,
      refresh: data.refresh,
      role: data.role || 'patient',
    };
  }
  
  export function registerUser(data) {
    return sendRequest('api/register/', 'POST', data);
  }
  
  export function checkEmailUnique(email) {
    return sendRequest(`api/check-email/${email}`);
  }
  
  export function sendPasswordResetLink(email) {
    return sendRequest('api/auth/users/reset_password/', 'POST', { email });
  }
  
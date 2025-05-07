export default async function sendRequest(url, method = 'GET', payload) {
    const token = localStorage.getItem('token');
    console.log(token, "token in send-request");

    const options = { method };

    if (payload instanceof FormData) {
        options.body = payload;
    } else if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const res = await fetch(`http://127.0.0.1:8000/api${url}`, options);
        console.log(res, "response in send-request");
        if (res.ok) return res.json(); 
        throw new Error('Error in request');
    } catch (err) {
        console.log(err, "error in send-request");
        throw err; 
    }
}



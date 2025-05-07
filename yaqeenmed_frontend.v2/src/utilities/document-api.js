export default async function uploadDocument(issueId, file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/issues/${issueId}/documents/`, {
            method: 'POST',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
        });

        if (res.ok) {
            return res.json();
        }

        throw new Error(`Upload failed: ${res.status}`);
    } catch (err) {
        console.error('Error uploading document:', err);
        throw err;
    }
}

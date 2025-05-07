import sendRequest from './sendRequest';

export function getIssues() {
    return sendRequest('/api/issues/');
}

export function createIssue(data) {
    return sendRequest('/api/issues/', 'POST', data);
}

export function updateIssueStatus(id, status) {
    return sendRequest(`/api/issues/${id}/`, 'PATCH', { status });
}

export function deleteIssue(id) {
    return sendRequest(`/api/issues/${id}/`, 'DELETE');
}

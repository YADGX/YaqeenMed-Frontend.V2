import sendRequest from './sendRequest';

export function getComments(issueId) {
    return sendRequest(`/api/issues/${issueId}/comments/`);
}

export function postComment(issueId, content) {
    return sendRequest(`/api/issues/${issueId}/comments/`, 'POST', { content });
}

export function updateComment(issueId, commentId, content) {
    return sendRequest(`/api/issues/${issueId}/comments/${commentId}/`, 'PUT', { content });
}

export function deleteComment(issueId, commentId) {
    return sendRequest(`/api/issues/${issueId}/comments/${commentId}/`, 'DELETE');
}

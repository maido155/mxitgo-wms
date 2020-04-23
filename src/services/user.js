import request from '@/utils/request';

export async function query() {
    return request('/api/users');
}
export async function queryCurrent() {
    return request('/api/currentUser');
}
export async function queryNotices() {
    return request('/api/notices');
}

export async function getDataUserByEmail({ email }) {
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user/email?email=${email}`
    );
}

export async function updateDataUser({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/user`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload.PUT),
    });
}

export async function getAvatarUser({ user }) {
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user/avatar?user=${user}`
    );
}

export async function saveAvatarUser({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/user/avatar`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload.POST),
    });
}

export async function saveShipping({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/shipping`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload.POST),
    });
}
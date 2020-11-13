import request from '@/utils/request';

export async function query() {
    return request(`${ANT_DESIGN_PRO_TARGET}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });
}
export async function queryCurrent() {
    return request(`${ANT_DESIGN_PRO_TARGET}/currentUser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });

}
export async function queryNotices() {
    return request(`${ANT_DESIGN_PRO_TARGET}/notices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });
}

export async function getDataUserByEmail({ email }) {
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user/email?email=${email.email}`, {
        method: 'GET',
        headers: {
            'Authorization': email.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });
}
export async function getDataUser({ email }) {
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user/email?email=${email.email}`, {
        method: 'GET',
        headers: {
            'Authorization': email.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });
}
export async function updateDataUser({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/user`, {
        method: 'PUT',
        headers: {
            // 'content-type': 'application/json',
            'Authorization': payload.PUT.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(payload.PUT),
    });
}

export async function getAvatarUser({ user }) {
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user/avatar?user=${user.user}`, {
        method: 'GET',
        headers: {
            'Authorization': user.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });
}

export async function saveAvatarUser({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/user/avatar`, {
        method: 'POST',
        headers: {
            // 'content-type': 'application/json', 
            'Authorization': payload.POST.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(payload.POST),
    });
}

export async function getAllUser({ payload }) {
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user`, {
        method: 'GET',
        headers: {
            'Authorization': payload.payload.GET.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    });
}

export async function saveNewUser({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/user`, {
        method: 'POST',
        headers: {
            // 'content-type': 'application/json', 
            'Authorization': payload.POST.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(payload.POST),
    });
}

export async function deleteNewUser({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/user`, {
        method: 'DELETE',
        headers: {
            // 'content-type': 'application/json', 
            'Authorization': payload.DELETE.Authorization,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(payload.DELETE),
    });
}
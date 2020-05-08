import { stringify } from 'qs';
import request from '@/utils/request';
import { async } from 'q';


export async function getUsers() { //your link to your lambda function.
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user`
    );
}

export async function generateComments(payload) {
    return request(`${ANT_DESIGN_PRO_TARGET}/generatecomment`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function queryProjectNotice() {
    return request(`${ANT_DESIGN_PRO_TARGET}/project/notice`);
}

export async function queryActivities() {
    return request(`${ANT_DESIGN_PRO_TARGET}/activities`);
}

export async function queryRule(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/rule`, {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/rule`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function fakeSubmitForm(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/forms`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function fakeChartData() {
    return request(`${ANT_DESIGN_PRO_TARGET}/fake_chart_data`);
}

export async function queryTags() {
    return request(`${ANT_DESIGN_PRO_TARGET}/tags`);
}

export async function queryBasicProfile() {
    return request(`${ANT_DESIGN_PRO_TARGET}/profile/basic`);
}

export async function queryAdvancedProfile() {
    return request(`${ANT_DESIGN_PRO_TARGET}/profile/advanced`);
}

export async function queryFakeList(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/User/login`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function fakeRegister(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/register`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function queryNotices() {
    return request(`${ANT_DESIGN_PRO_TARGET}/notices`);
}

export async function generateInterview(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/interviews`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function joinToInterview(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/interview/generate`, {
        headers: { 'Content-Type': 'application/json; charset=utf8' },
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function generateCandidate(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/candidate`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}
export async function loginCandidate(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/users/detail?email=${params.email}`);
}

export async function finishTwilioAnswer(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/twilio/finish`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}
export async function finishSaveQuestion(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/questions/savequestion`, {
        headers: { 'Content-Type': 'application/json; charset=utf8' },
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function generateHotlist(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/hotlist`, {
        headers: { 'Content-Type': 'application/json; charset=utf8' },
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function getInterviewDetail({ payload }) {
    console.log(payload.link);
    console.log(`${ANT_DESIGN_PRO_TARGET}/interview?link=${payload.link}`);
    return request(
        `${ANT_DESIGN_PRO_TARGET}/interview?responseLink=${payload.link}&companyId=${payload.companyId}&userId=${payload.userId}`,
    );
}
export async function getQuestionsByCandidate({ questionsPayload }) {
    console.log(questionsPayload);
    return request(
        `/api/interview/questions?candidateId=${questionsPayload.candidateId}&interviewId=${questionsPayload.interviewId}`,
    );
}

export async function getCandidates({ payload }) {
    console.log('payload');
    console.log(payload);
    return request(`${ANT_DESIGN_PRO_TARGET}/getcandidates?rlink=${payload.rlink}`);
}
export async function getCandidatesOnHotlist({ payload }) {
    console.log('testing');
    console.log('testing');
    return request(
        `${ANT_DESIGN_PRO_TARGET}/hotlist/candidatesonhotlist?companyId=${payload.companyId}`,
    );
}

export async function getInterviews({ payload }) {
    console.log(payload);
    return request(`${ANT_DESIGN_PRO_TARGET}/interviews?companyId=${payload.companyId}`);
}

export async function getCandidatesByHotlist({ payload }) {
    console.log(payload.link);
    console.log(`${ANT_DESIGN_PRO_TARGET}/candidatesiByHotlist?hotlistLink=${payload.link}`);
    return request(
        `/api/hotlist/candidates?hotlistlink=${payload.link}&companyId=${payload.companyId}`,
    );
}
export async function getCandidateByLink({ payload }) {
    console.log(payload);
    //console.log(payload.interviewLink);
    //console.log(`${ANT_DESIGN_PRO_TARGET}/candidate?interviewLink=${payload.interviewLink}`);
    return request(
        `/api/getcandidate?responseLink=${payload.interviewLink}&companyId=${payload.companyId}&userId=${payload.userId}`,
    );
}

//fetchCandidatesByHotlist

export async function getHotlist({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/hotlist?companyId=${payload.companyId}`);
}

export async function getCompanies({ payload }) {
    if (payload) {
        return request(`${ANT_DESIGN_PRO_TARGET}/companies?createdBy=${payload.userId}`);
    } else {
        return request(
            `${ANT_DESIGN_PRO_TARGET}/companies?createdBy=${localStorage.getItem('userId')}`,
        );
    }
}

export async function getIndustries() {
    return request(`${ANT_DESIGN_PRO_TARGET}/catalogs/industries`);
}

// export async function getUsers({ payload }) {
//     console.log(payload);
//     return request(`${ANT_DESIGN_PRO_TARGET}/dev/user/email?email=${payload.userId}`);
// }

export async function getCompaniesByUsers({ payload }) {
    console.log(payload);
    return request(`${ANT_DESIGN_PRO_TARGET}/users/company?userId=${payload.userId}`);
}
export async function getDepartmentsByUsers({ payload }) {
    console.log('payload');
    console.log(payload);
    return request(`${ANT_DESIGN_PRO_TARGET}/companies/departments?companyId=${payload.companyId}`);
}

export async function getRolesByUsers({ payload }) {
    console.log(payload);
    return request(`${ANT_DESIGN_PRO_TARGET}/users/roles?userId=${payload.userId}`);
}

export async function getStats({ payload }) {
    console.log(payload);
    return request(
        `${ANT_DESIGN_PRO_TARGET}/stats?userId=${payload.userId}&companyId=${payload.companyId}`,
    );
}
export async function getComments({ payload }) {
    console.log('Payload ' + payload);
    return request(`${ANT_DESIGN_PRO_TARGET}/user/comments/?payload=${JSON.stringify(payload)}`);
}

export async function generateCompany(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/companies`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params.payload),
    });
}

export async function generateDepartment(params) {
    console.log('parametros');
    console.log(params);
    return request(`${ANT_DESIGN_PRO_TARGET}/companies/departments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params.payload),
        // body: {"departmentName":"area TI","companyId":"d211a14a-93a2-4922-baee-0ef7cbe22e40"}

        // body: params.payload,
    });
}
export async function deleteDepartment(params) {
    console.log('delete');
    console.log(params);
    return request(`${ANT_DESIGN_PRO_TARGET}/companies/departments`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params.payload),
    });
}

export async function generateUser(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/users`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function updateCompany(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/companies`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params.payload),
    });
}

export async function updateDepartment(params) {
    console.log('params');
    console.log(params);
    return request(`${ANT_DESIGN_PRO_TARGET}/companies/departments`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params.payload),
    });
}

export async function updateUser(params) {
    return request(`${ANT_DESIGN_PRO_TARGET}/users`, {
        method: 'PUT',
        body: JSON.stringify(params),
    });
}

export async function updateInterviewStatus(payload) {
    return request(`${ANT_DESIGN_PRO_TARGET}/interview/updateinterviewstatus`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}
export async function getInterviewStatus({ payload }) {
    console.log('Payload ' + payload);
    return request(
        `${ANT_DESIGN_PRO_TARGET}/user/getCandidateInterviewStatus?payload=${JSON.stringify(payload)}`,
    );
}
export async function saveShipping({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/shipping`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Authorization': payload.POST.Authorization },
        body: JSON.stringify(payload.POST),
    });
}
export async function fetchProgrammingAll({ payload }) {
    return request(`${ANT_DESIGN_PRO_TARGET}/programming/all`, {
        method: 'GET',
        headers: { 'Authorization': payload.Authorization },
    });
}
/* export async function getOrderDetail() {
  console.log(orderId);
  return request(`${ANT_DESIGN_PRO_TARGET}/orderDetails?orderId=1`);

}
 */
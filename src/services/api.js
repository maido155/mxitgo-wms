import { stringify } from 'qs';
import request from '@/utils/request';
import { async } from 'q';

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
    `${ANT_DESIGN_PRO_TARGET}/interview?responseLink=${payload.link}&companyId=${payload.companyId}&userId=${payload.restaurantId}`,
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
    `/api/getcandidate?responseLink=${payload.interviewLink}&companyId=${payload.companyId}&userId=${payload.restaurantId}`,
  );
  
}





export async function getRestaurants({ payload }) {
  
    return request(`${ANT_DESIGN_PRO_TARGET}/restaurants?restaurantId=${payload.restaurantId}`)
}


/* export async function getOrderDetail() {
  console.log(orderId);
  return request(`${ANT_DESIGN_PRO_TARGET}/orderDetails?orderId=1`);

}
 */

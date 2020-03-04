import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getDataUserByEmail(email) {
  console.log(email);
  console.log(email);
  return request(`${ANT_DESIGN_PRO_TARGET}/user/email?email=${email}`);
}

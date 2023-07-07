//production server
export const API_BASE_URL = 'http://94.229.79.27:55412/api/v1/accesss';

//live server
// export const API_BASE_URL = 'https://pgmerchantsapi.paylodeservices.com/api/v1/accesss';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const LOGIN = getApiUrl('/login')
export const SIGNUP = getApiUrl('/register')
export const FORGOTPASSWORD = getApiUrl('/recoverpass')
export const RESETPASSWORD = getApiUrl('/resetpassword')
export const REQUESTOTP = getApiUrl('/sendverification')
export const VALIDATEOTP = getApiUrl('/validateotp')
export const CHANGEPASSWORD = getApiUrl('/changepassword')

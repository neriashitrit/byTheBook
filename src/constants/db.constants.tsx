export const GET_CONFIG = {
  baseURL: '',
  withCredentials: false,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
};

// Server Base Url
export const SERVER_BASE_URL = 'https://sore-rose-betta-wrap.cyclic.app';

// Local Base  Url
// export const SERVER_BASE_URL = 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  USERS: {
    CREATE_USER: '/api/webapp/createUser',
    GET_ALL: '/api/webapp/getAllUsers',
    
  },
  ADMIN: {
    LOGIN: '/api/webapp/adminLogin',
  },
  LOGS: {
    LOG_ERROR: '/api/openRouter/logError',
  }
};
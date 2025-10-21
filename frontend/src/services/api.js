import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const studentSignup = (data) => API.post('/auth/student/signup', data);
export const studentLogin = (data) => API.post('/auth/student/login', data);
export const addInternship = (data) => API.post('/students/internship', data);

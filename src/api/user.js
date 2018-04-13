import Api from '../utils/api';

const api = new Api();
const baseUri = 'v2/login';

export const doLogin = (body) => api.post(`${baseUri}`, { body, completePath: true });

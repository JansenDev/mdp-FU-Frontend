import { TOKEN } from '../constants/token';

export function setToken(token: string | Object) {
  localStorage.setItem(TOKEN, JSON.stringify(token));
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

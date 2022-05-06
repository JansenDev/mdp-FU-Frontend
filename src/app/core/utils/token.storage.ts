import jwtDecode from 'jwt-decode';
import { TOKEN } from '../constants/token';

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function getToken(): any {
  const token = localStorage.getItem(TOKEN) || '';

  if (token === '') {
    return undefined;
  }
  const tokenDecode = jwtDecode(token);
  return tokenDecode;
}

export function getTokenBearer() {
  let token: string | undefined = localStorage.getItem(TOKEN) || '';

  if (token === '') {
    token = undefined;
  }

  return token;
}

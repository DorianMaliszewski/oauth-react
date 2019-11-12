import { AUTH_TOKEN } from "../constants";

export function isConnected() {
  return localStorage.getItem(AUTH_TOKEN);
}

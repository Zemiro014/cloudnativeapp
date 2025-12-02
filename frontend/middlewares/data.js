/* eslint-disable no-undef */
import axios from 'axios';

const protocol =
  process.env.API_PROTOCOL || process.env.NEXT_PUBLIC_API_PROTOCOL || 'http';
const host = process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST;
const port = process.env.API_PORT || process.env.NEXT_PUBLIC_API_PORT;

let server = '';

if (host) {
  server = `${protocol}://${host}`;
  if (port && port !== '80' && port !== '443') {
    server += `:${port}`;
  }
} else {
  server =
    typeof window === 'undefined'
      ? 'http://my-backend:3000' // Server-side fallback
      : 'http://localhost:3001'; // Client-side fallback
}

console.log('🔗 Axios BaseURL:', server);

axios.defaults.baseURL = server;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function getData(resource) {
  try {
    const { data } = await axios.get(resource);
    return data;
  } catch (error) {
    throw `Error while getting data: ${error}`;
  }
}
export async function postData(resource, body) {
  try {
    await axios.post(resource, body);
  } catch (error) {
    throw `Error while posting data: ${error}`;
  }
}
export async function putData(resource, id, body) {
  try {
    await axios.put(`${resource}/${id}`, body);
  } catch (error) {
    throw `Error while putting data: ${error}`;
  }
}
export async function deleteData(resource, id) {
  try {
    await axios.delete(`${resource}/${id}`);
  } catch (error) {
    throw `Error while deleting data: ${error}`;
  }
}

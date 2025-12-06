/* eslint-disable no-undef */
import axios from 'axios';

let server;

if (typeof window === 'undefined') {
  // --- SERVER SIDE (SSR / Docker) ---
  // Aqui o código roda dentro do container do App Runner.
  // Ele consegue ler a variável de ambiente 'API_URL' que o CloudFormation injetou em tempo de execução.
  // Fallback: 'http://my-backend:3000' (para docker-compose local)
  server = process.env.API_URL || 'http://my-backend:3000';
} else {
  // --- CLIENT SIDE (Navegador) ---
  // O navegador não sabe a URL da AWS.
  // Então mandamos ele bater na rota '/api-backend'.
  // O next.config.mjs vai pegar isso e redirecionar para o backend real.
  server = '/api-backend';
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

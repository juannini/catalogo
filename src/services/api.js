import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
});

export async function getItems(nombre = '') {
  try {
    const { data } = await api.get('/character', {
      params: nombre ? { name: nombre } : {},
    });
    return data.results;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
}

export async function getItemById(id) {
  if (!/^\d+$/.test(id)) return null;

  try {
    const { data } = await api.get(`/character/${id}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
}

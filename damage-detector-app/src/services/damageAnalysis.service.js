import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export async function analyzeDamage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(`${API_URL}/analyze-damage`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.analysis;
}
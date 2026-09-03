import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export async function analyzeDamage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(`${API_URL}/analyze-damage`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.analysis;
}
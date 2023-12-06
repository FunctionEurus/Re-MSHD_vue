import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://restapi.amap.com/v3/geocode/geo',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
    async getLocation(address: string, output = 'XML', key: string) {
      // Create an object with the parameters
      const params = {
        address: address,
        output: output,
        key: key,
      };
  
      // Make the GET request with the parameters
      return apiClient.get('', { params });
    },
  };
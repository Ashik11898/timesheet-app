import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'https://timesheet-app-server.vercel.app', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Utility function to handle requests
const axiosRequest = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data; // Return the data directly from the response
  } catch (error) {
    // Handle errors globally here
    if (error instanceof Error) {
      console.error('API Request Error:', error.message);
    }
    return null; // Return null in case of an error
  }
};

export { axiosRequest };

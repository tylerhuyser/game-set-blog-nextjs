import { baseUrl } from "./baseUrl"

export const api = async (endpoint, options = {}) => {
  const url = `${baseUrl}${endpoint}`
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const mergedOptions = {...defaultOptions, ...options}

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.error(`API Request Error: ${error.message}`);
    throw error;
  
  }
}
import axios from 'axios';  

const API_KEY = '11539560-6ff438bd7cc613d70e4d35abc';  
const BASE_URL = 'https://pixabay.com/api/';  
let currentPage = 1;  
let currentQuery = '';

export async function fetchImages(query) {  
  const params = {  
    key: API_KEY,  
    q: query,  
    image_type: 'photo',  
    orientation: 'horizontal',  
    safesearch: true,  
    page: currentPage,
    per_page: 40,
  };  

  const url = `${BASE_URL}?${new URLSearchParams(params)}`;  

  try {  
    const response = await axios.get(url);  
    return response.data;
  } catch (error) {  
    console.error('Error fetching data from Pixabay API:', error);  
    throw error; 
  }  
}  


export function resetPage() {  
  currentPage = 1;  
}  

export function incrementPage() {  
  currentPage += 1;  
}  

export function setQuery(query) {  
  currentQuery = query;  
}  

export function getCurrentQuery() {  
  return currentQuery;  
}

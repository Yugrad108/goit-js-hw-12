import axios from 'axios';  

const API_KEY = '11539560-6ff438bd7cc613d70e4d35abc';  
const BASE_URL = 'https://pixabay.com/api/';  

export function fetchImages(query) {  
  const params = {  
    key: API_KEY,  
    q: query,  
    image_type: 'photo',  
    orientation: 'horizontal',  
    safesearch: true,  
  };  

  const url = `${BASE_URL}?${new URLSearchParams(params)}`;  

  return axios  
    .get(url)  
    .then(response => response.data.hits)  
    .catch(error => {  
      console.error('Error fetching data from Pixabay API:', error);  
      throw error;  
    });  
}
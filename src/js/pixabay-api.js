import axios from 'axios';  

const API_KEY = '11539560-6ff438bd7cc613d70e4d35abc';  
const BASE_URL = 'https://pixabay.com/api/';  
let currentPage = 1;  // Текущая страница для пагинации  
let currentQuery = '';  // Текущий поисковый запрос


// Функция для получения изображений с API  
export async function fetchImages(query) {  
  const params = {  
    key: API_KEY,  
    q: query,  
    image_type: 'photo',  
    orientation: 'horizontal',  
    safesearch: true,  
    page: currentPage, // Используем текущую страницу 
    per_page: 40,  // Получаем 40 изображений за один запрос
  };  

  const url = `${BASE_URL}?${new URLSearchParams(params)}`;  

  try {  
    const response = await axios.get(url);  
    return response.data;  // Возвращаем данные из ответа 
  } catch (error) {  
    console.error('Error fetching data from Pixabay API:', error);  
    throw error;  // Обработка ошибок  
  }  
}  

// Сброс номера страницы до 1 
export function resetPage() {  
  currentPage = 1;  
}  
// Увеличение номера страницы на 1
export function incrementPage() {  
  currentPage += 1;  
}  
// Установка текущего поискового запроса 
export function setQuery(query) {  
  currentQuery = query;  
}  
// Получение текущего поискового запроса 
export function getCurrentQuery() {  
  return currentQuery;  
}




// import axios from 'axios';  

// const API_KEY = '11539560-6ff438bd7cc613d70e4d35abc';  
// const BASE_URL = 'https://pixabay.com/api/';  

// export function fetchImages(query) {  
//   const params = {  
//     key: API_KEY,  
//     q: query,  
//     image_type: 'photo',  
//     orientation: 'horizontal',  
//     safesearch: true,  
//   };  

//   const url = `${BASE_URL}?${new URLSearchParams(params)}`;  

//   return axios  
//     .get(url)  
//     .then(response => response.data.hits)  
//     .catch(error => {  
//       console.error('Error fetching data from Pixabay API:', error);  
//       throw error;  
//     });  
// }


import { fetchImages, resetPage, incrementPage, setQuery, getCurrentQuery } from './js/pixabay-api.js';  
import { renderGallery } from './js/render-functions.js';  
import iziToast from 'izitoast';  
import 'izitoast/dist/css/iziToast.min.css';  

const refs = {  
  form: document.querySelector('#search-form'),  
  input: document.querySelector('#search-input'),  
  loader: document.querySelector('#loader'), // Индикатор загрузки  
  gallery: document.querySelector('#gallery'),  
  loadMoreButton: document.querySelector('.load-more-button'), // Кнопка "Load more"  
};  

// Обработчик события отправки формы  
refs.form.addEventListener('submit', handleFormSubmit);  
refs.loadMoreButton.addEventListener('click', handleLoadMore); // Обработчик события нажатия на кнопку "Load more"  

// Функция обработки отправки формы  
async function handleFormSubmit(event) {  
  event.preventDefault();  
  const query = refs.input.value.trim();  

  if (!query) {  
    showError('Please enter a search term!'); // Сообщение об ошибке, если запрос пустой  
    clearGallery(); // Очистка галереи при пустом запросе 
    return;  
  }  

  resetPage(); // Сброс номера страницы  
  setQuery(query); // Установка текущего запроса  
  clearGallery(); // Очистка галереи  

  showLoader(); // Показать загрузчик перед началом загрузки изображений  

  try {  
    const data = await fetchImages(query); // Получение изображений  
    handleImageFetchResponse(data); // Обработка ответа  
  } catch (error) {  
    showError('Something went wrong! Please try again later.'); // Сообщение об ошибке  
  } finally {  
    hideLoader(); // Скрыть загрузчик после завершения загрузки  
  }  

  refs.input.value = ''; // Очистка поля ввода  
}  

// Функция обработки нажатия на кнопку "Load more"  
async function handleLoadMore() {  
  const query = getCurrentQuery(); // Получение текущего запроса  
  incrementPage(); // Увеличение номера страницы  

  showLoader(); // Показать загрузчик перед началом загрузки дополнительных изображений  

  try {  
    const data = await fetchImages(query); // Получение дополнительных изображений  
    handleImageFetchResponse(data); // Обработка ответа  
  } catch (error) {  
    showError('Something went wrong! Please try again later.'); // Сообщение об ошибке  
  } finally {  
    hideLoader(); // Скрыть загрузчик после завершения загрузки  
  }  
}  

// Функция обработки ответа с изображениями  
function handleImageFetchResponse(data) {  
  const { hits, totalHits } = data; // Извлечение изображений и общего количества  

  if (hits.length === 0) {  
    // Если нет изображений  
    showInfo('Sorry, there are no images matching your search query. Please try again!'); // Сообщение, если нет изображений  
    refs.loadMoreButton.classList.add('hidden'); // Скрытие кнопки "Load more"  
    return; // Выход из функции, чтобы не показывать другие сообщения  
  }  

  renderGallery(hits); // Отображение изображений  
  refs.loadMoreButton.classList.remove('hidden'); // Показ кнопки "Load more"  

  // Проверка, достигнут ли конец коллекции изображений  
  if (hits.length < 40 || totalHits <= refs.gallery.children.length) {  
    refs.loadMoreButton.classList.add('hidden'); // Скрытие кнопки "Load more"  
    showInfo("We're sorry, but you've reached the end of search results."); // Сообщение о конце коллекции  
  }  

  scrollToNewItems(); // Прокрутка к новым элементам  
}  

// Функция для отображения загрузчика  
function showLoader() {  
  refs.loader.classList.remove('hidden'); // Убираем класс 'hidden', чтобы показать загрузчик  
}  

// Функция для скрытия загрузчика  
function hideLoader() {  
  refs.loader.classList.add('hidden'); // Добавляем класс 'hidden', чтобы скрыть загрузчик  
}  

// Функция для отображения сообщения об ошибке  
function showError(message) {  
  iziToast.error({  
    title: 'Error',  
    message,  
    position: 'topRight',  
    timeout: 2000,  
  });  
}  

// Функция для отображения информационного сообщения  
function showInfo(message) {  
  iziToast.info({  
    title: '',  
    message,  
    position: 'topRight',  
    timeout: 3000,  
  });  
}  

// Функция для очистки галереи  
function clearGallery() {  
  refs.gallery.innerHTML = '';  
}  

// Функция для плавной прокрутки к новым элементам  
function scrollToNewItems() {  
  const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect(); // Получение высоты карточки  
  window.scrollBy({  
    top: cardHeight * 2, // Прокрутка на две высоты карточки  
    behavior: 'smooth',  
  });  
}



// import { fetchImages } from './js/pixabay-api.js';
// import { renderGallery } from './js/render-functions.js';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const refs = {
//   form: document.querySelector('#search-form'),
//   input: document.querySelector('#search-input'),
//   loader: document.querySelector('#loader'),
//   gallery: document.querySelector('#gallery'),
// };

// function showLoader() {
//   refs.loader.classList.remove('hidden');
// }

// function hideLoader() {
//   refs.loader.classList.add('hidden');
// }

// function showError(message) {
//   iziToast.error({
//     title: 'Error',
//     message,
//     position: 'topRight',
//     timeout: 2000,
//   });
// }

// function showInfo(message) {
//   iziToast.info({
//     title: '',
//     message,
//     position: 'topRight',
//     timeout: 3000,
//   });
// }

// function clearGallery() {  
//   refs.gallery.innerHTML = '';
// }  

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const query = refs.input.value.trim();

//   if (!query) {
//     showError('Please enter a search term!');
//     clearGallery(); 
//     return;
//   }

// clearGallery(); 

//   fetchImagesWithLoader(query);
//   refs.input.value = '';
// }

// function fetchImagesWithLoader(query) {
//   showLoader();

//   fetchImages(query)
//     .then(images => {
//       hideLoader();
//       handleImageFetchResponse(images);
//     })
//     .catch(error => {
//       hideLoader();
//       showError('Something went wrong! Please try again later.');
//       console.error('Error fetching images:', error);
//     });
// }

// function handleImageFetchResponse(images) {
//   if (images.length === 0) {
//     showInfo('Sorry, there are no images matching your search query. Please try again!');
//   } else {
//     renderGallery(images);
//   }
// }

// refs.form.addEventListener('submit', handleFormSubmit);



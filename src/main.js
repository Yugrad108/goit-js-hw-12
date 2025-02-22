import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('#search-input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('#gallery'),
};

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
    timeout: 2000,
  });
}

function showInfo(message) {
  iziToast.info({
    title: '',
    message,
    position: 'topRight',
    timeout: 3000,
  });
}

function clearGallery() {  
  refs.gallery.innerHTML = '';
}  

function handleFormSubmit(event) {
  event.preventDefault();
  const query = refs.input.value.trim();

  if (!query) {
    showError('Please enter a search term!');
    clearGallery(); 
    return;
  }

clearGallery(); 

  fetchImagesWithLoader(query);
  refs.input.value = '';
}

function fetchImagesWithLoader(query) {
  showLoader();

  fetchImages(query)
    .then(images => {
      hideLoader();
      handleImageFetchResponse(images);
    })
    .catch(error => {
      hideLoader();
      showError('Something went wrong! Please try again later.');
      console.error('Error fetching images:', error);
    });
}

function handleImageFetchResponse(images) {
  if (images.length === 0) {
    showInfo('Sorry, there are no images matching your search query. Please try again!');
  } else {
    renderGallery(images);
  }
}

refs.form.addEventListener('submit', handleFormSubmit);



import { fetchImages, resetPage, incrementPage, setQuery, getCurrentQuery } from './js/pixabay-api.js';  
import { renderGallery } from './js/render-functions.js';  
import iziToast from 'izitoast';  
import 'izitoast/dist/css/iziToast.min.css';  

const refs = {  
  form: document.querySelector('#search-form'),  
  input: document.querySelector('#search-input'),  
  loader: document.querySelector('#loader'),  
  gallery: document.querySelector('#gallery'),  
  loadMoreButton: document.querySelector('.load-more-button'),  
};  

refs.form.addEventListener('submit', handleFormSubmit);  
refs.loadMoreButton.addEventListener('click', handleLoadMore);  

async function handleFormSubmit(event) {  
  event.preventDefault();  
  const query = refs.input.value.trim();  

  if (!query) {  
    showError('Please enter a search term!');  
    clearGallery();  
    return;  
  }  

  resetPage();  
  setQuery(query);  
  clearGallery();  

  showLoader();  

  try {  
    const data = await fetchImages(query);  
    handleImageFetchResponse(data);  
  } catch (error) {  
    showError('Something went wrong! Please try again later.');  
  } finally {  
    hideLoader();  
  }  

  refs.input.value = '';  
}  

async function handleLoadMore() {  
  const query = getCurrentQuery();  
  incrementPage();  

  showLoader();  

  try {  
    const data = await fetchImages(query);  
    handleImageFetchResponse(data);  
  } catch (error) {  
    showError('Something went wrong! Please try again later.');  
  } finally {  
    hideLoader();  
  }  
}  

function handleImageFetchResponse(data) {  
  const { hits, totalHits } = data;  

  if (hits.length === 0) {  
    showInfo('Sorry, there are no images matching your search query. Please try again!');  
    refs.loadMoreButton.classList.add('hidden');  
    return;  
  }  

  renderGallery(hits);  
  refs.loadMoreButton.classList.remove('hidden');  

  if (hits.length < 40 || totalHits <= refs.gallery.children.length) {  
    refs.loadMoreButton.classList.add('hidden');  
    showInfo("We're sorry, but you've reached the end of search results.");  
  }  

  scrollToNewItems();  
}  

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

function scrollToNewItems() {  
  const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();  
  window.scrollBy({  
    top: cardHeight * 2,  
    behavior: 'smooth',  
  });  
}


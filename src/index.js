import API from './apiService';
import imgCardTmp from './templates/img-card.hbs';
import getRefs from './refs';
import _ from 'lodash';

const refs = getRefs();

refs.searchForm.addEventListener('submit', createGallery);
refs.moreBtn.classList.add("visually-hidden");
refs.moreBtn.addEventListener('click', createGalleryMarkup)

function createGallery(e) {
    e.preventDefault();
    galleryReset();

    API.query = refs.input.value.trim();

    if (API.query === '') {
        const error = onError();
        return error;
    }

    API.fetchImages().then(createGalleryMarkup);
}

function onError() {
    alert({
        type: 'error',
        text: 'Nothing found!',
        delay: 100,
        animateSpeed: 'fast',
    });
};

function createGalleryMarkup(images) {
    refs.gallery.insertAdjacentHTML("beforeend", imgCardTmp(images));
    refs.moreBtn.classList.remove("visually-hidden");
}


function galleryReset() {
    refs.searchForm.textContent = '';
    refs.gallery.textContent = '';
}

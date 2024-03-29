import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import API from './apiService';
import imgCardTmp from './templates/img-card.hbs';
import modalCard from './templates/modal-card.hbs';
import getRefs from './refs';
import _ from 'lodash';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice } from '@pnotify/core';


const refs = getRefs();

refs.searchForm.addEventListener('submit', createGallery);
refs.moreBtn.classList.add("visually-hidden");
refs.againBtn.classList.add("visually-hidden");
refs.moreBtn.addEventListener('click', createMoreGalleryMarkup);
refs.againBtn.addEventListener('click', galleryReset);


function createGallery(e) {
    e.preventDefault();

    API.query = refs.input.value.trim();
    refs.searchForm.classList.add("visually-hidden");

    if (API.query === '') {
        onAlert();
        galleryReset();
        return;
    }
    pageReset();
    API.fetchImages().then(createGalleryMarkup);
};

function createGalleryMarkup(imageArr) {
    if (imageArr.length === 0) {
        onError();
    }
    renderMarkup(imageArr);
    refs.moreBtn.classList.remove("visually-hidden");
    refs.againBtn.classList.remove("visually-hidden");

    refs.moreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });

};

function createMoreGalleryMarkup() {
    API.fetchImages().then(createGalleryMarkup);
};

function renderMarkup(images) {
    refs.gallery.insertAdjacentHTML("beforeend", imgCardTmp(images));

    refs.gallery.addEventListener('click', e => {
        if (e.target.tagName !== 'IMG') {
            return;
        }
        const modal = basicLightbox.create(`<img src = ${e.target.dataset.large} id="openedImg" />`).show();
    });
};


function galleryReset() {
    refs.gallery.textContent = '';
    refs.input.value = '';
    refs.searchForm.classList.remove("visually-hidden");
    refs.moreBtn.classList.add("visually-hidden");
    refs.againBtn.classList.add("visually-hidden");
};

function onAlert() {
    notice({
        type: 'error',
        text: 'Search undefined!',
        delay: 100,
        animateSpeed: 'fast',
        addClass: 'alert',
    });
};

function onError() {
    alert({
        type: 'error',
        text: 'Nothing found!',
        delay: 100,
        animateSpeed: 'normal',
        addClass: 'alert',
    });
};

function pageReset() {
    API.defaultPage = 1;
}


import API from './apiService';
import imgCardTmp from './templates/img-card.hbs';
import getRefs from './refs';
import _ from 'lodash';

const refs = getRefs();

const debouncedCreateGallery = _.debounce(createGallery, 500);

refs.searchForm.addEventListener('keydown', debouncedCreateGallery);

function createGallery(e) {
    e.preventDefault();
    galleryReset();

    const search = e.target.value.trim();
    let query = refs.searchForm.value;

    if (search > 0) {
        API.fetchImages(query)
            .then(createGalleryMarkup)
            .catch(onError);
    }
}

function onError(error) {
    alert({
        type: 'error',
        text: 'Nothing found!',
        delay: 100,
        animateSpeed: 'fast',
    });
};

function createGalleryMarkup(images) {
    // refs.gallery.insertAdjacentHTML("beforeend", imgCardTmp(images));
    renderImgList(images);
}

function renderImgList(images) {
    const searchedImages = images.map(image => {
        const galleryItem = document.createElement('li');
        galleryItem.textContent = `${imgCardTmp}`;
        return galleryItem;
    });
    gallery.append(...searchedImages);
};


function pageNr() {
    defaultPage += 1;
}

function galleryReset() {
    refs.searchForm.textContent = '';
    refs.gallery.textContent = '';
}

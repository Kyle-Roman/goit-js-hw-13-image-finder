const BASE_URL = "https://pixabay.com/api/";
const pixabayKey = "22969776-9de8346515d89d44141e5bd5e";
let defaultPage = 1;


function fetchImages() {
    return fetch('{BASE_URL}?image_type = photo & orientation=horizontal & q=что_искать & page=номер_страницы & per_page=12 & key=${pixabayKey}')
        .then(res => res.json())
        .then(console.log);
}

function pageNr() {
    defaultPage += 1;
}




// {{BASE_URL}}?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=9de8346515d89d44141e5bd5e




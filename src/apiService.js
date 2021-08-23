const BASE_URL = "https://pixabay.com/api/";
const pixabayKey = "22969776-9de8346515d89d44141e5bd5e";
// const query = '';

const imageFile = {
    "comments": 78,
    "downloads": 63296,
    "largeImageURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_1280.jpg",
    "likes": 575,
    "views": 127450,
    "webformatURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_640.jpg",
}

const options = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    },
    // body: JSON.stringify(imageFile),
}


function fetchImages() {
    let defaultPage = 1;

    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${defaultPage}&per_page=12&key=${pixabayKey}`)
        .then(res => res.json())
        .then(images => {
            defaultPage += 1;
            return images.hits;
        })
}


export default { fetchImages };
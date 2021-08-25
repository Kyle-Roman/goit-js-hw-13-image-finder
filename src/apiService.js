const BASE_URL = "https://pixabay.com/api/";
const pixabayKey = "22969776-9de8346515d89d44141e5bd5e";

async function fetchImages() {

    const serverResponse = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.defaultPage}&per_page=12&key=${pixabayKey}`)

    const imagesSet = await serverResponse.json();
    const imageArr = imagesSet.hits;
    this.defaultPage += 1;
    console.log(imagesSet.hits);
    return imageArr;
}


export default { fetchImages };
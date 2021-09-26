import requestOptions from './api';

async function fetchImage(objectNumber: string) {
  const data = await fetch(
    `https://www.rijksmuseum.nl/api/${requestOptions.culture}/collection/${objectNumber}?key=${requestOptions.API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => json.artObject);
  return data;
}

export default fetchImage;

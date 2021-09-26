import requestOptions from './api';

async function fetchImages(
  search: string,
  page: number,
  sort: string,
  color: string
) {
  const data = await fetch(
    `https://www.rijksmuseum.nl/api/${requestOptions.culture}/collection?key=${requestOptions.API_KEY}&imgonly=${requestOptions.imgonly}&ps=${requestOptions.resultsPerPage}&p=${page}&q=${search}&s=${sort}&f.normalized32Colors.hex=${color}`
  )
    .then((response) => response.json())
    .then((json) => json);
  return data;
}

export default fetchImages;

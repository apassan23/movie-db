const API_KEY = "b2c017150845a70525adfdbe2a06f294";
export const SEARCH_BIO_MAX_LENGTH = 580;
export const KNOWN_MAX_LENGTH = 30;
export const EVENT_MAX_LENGTH = 180;
export const MAX_CAST_LENGTH = 6;
export const MAX_OVERVIEW_LENGTH = 2000;

export const getURL = (urlType, eventType) =>
  `https://api.themoviedb.org/3/${eventType}/${urlType}?api_key=${API_KEY}&language=en-US&page=1`;

export const getImageURL = imgPath =>
  `https://image.tmdb.org/t/p/w500${imgPath}`;

export const getURLByID = (eventType, event_id) =>
  `https://api.themoviedb.org/3/${eventType}/${event_id}?api_key=${API_KEY}&language=en-US`;

import axios from "axios";

const API_KEY = "IcHl7zXAYsrJd5R0rB_SZ34fFquPdsGXRM_tgiMaDPg";

const data = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const GetAllPhotos = (search, page) => {
  return data.get(
    `/search/photos/?client_id=${API_KEY}&query=${search}&per_page=20&page=${page}`,
  );
};

export const GetUser = (user) => {
  return data.get(`/users/${user}/?client_id=${API_KEY}`);
};

export const GetUserPortfolio = (username) => {
  return data.get(`/users/${username}/photos/?client_id=${API_KEY}`);
};

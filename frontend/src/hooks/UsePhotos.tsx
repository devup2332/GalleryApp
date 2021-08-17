import axios from "axios";
import { useEffect, useState } from "react";
import { environments } from "../environments";

const usePhotos = () => {
  const [photosHome, setPhotos] = useState([]);

  const getPhotos = async () => {
    const { data } = await axios.get(`${environments.api_uri}/photos`);
    return setPhotos(data.photos);
  };

  useEffect(() => {
    getPhotos();
  },[]);
  return [photosHome];
};

export default usePhotos;

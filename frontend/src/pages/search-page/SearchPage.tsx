import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeaderComponent from "../../components/Header/Header";
import NoPhotos from "../../components/NoPhoto/NoPhoto";
import SliderImage from "../../components/SliderImages/SliderImage";
import { environments } from "../../environments";
import useUser from "../../hooks/UseUser";
import { Photo } from "../../models/Interfaces/Photo";
import GalleryComponent from "../home/components/Gallery/Gallery";

const SearchPage = () => {
  const { user } = useUser();
  const { text } = useParams() as any;
  const [index, setIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const r = await axios.get(
        `${environments.api_uri}/photos/search/${text}`
      );
      setPhotos(r.data.photos);
    };
    getPhotos();
  }, [text]);
  return (
    <div className="search-page fadeIn">
      {user ? <HeaderComponent user={user} /> : <HeaderComponent />}
      {photos.length > 0 ? (
        <GalleryComponent photos={photos} setIndex={setIndex} />
      ) : (
        <NoPhotos text="No photo found" />
      )}

      <SliderImage photos={photos} index={index} setIndex={setIndex} />
    </div>
  );
};

export default SearchPage;

import { useEffect, useState } from "react";
import NoPhoto from "../../components/NoPhoto/NoPhoto";
import useUser from "../../hooks/UseUser";
import BannerComponent from "./components/Banner/Banner";
import GalleryComponent from "./components/Gallery/Gallery";
import HeaderComponent from "../../components/Header/Header";
import "./Home.scss";
import SliderImage from "../../components/SliderImages/SliderImage";
import usePhotos from "../../hooks/UsePhotos";

const HomePage = () => {
  const { user, photos } = useUser();
  const [photosHome] = usePhotos();
  const [index, setIndex] = useState(0);

  return (
    <div className="home_page_container fadeIn">
      <HeaderComponent user={user} />
      <BannerComponent user={user} />
      {photosHome?.length > 0 ? (
        <GalleryComponent photos={photosHome} setIndex={setIndex} />
      ) : (
        <NoPhoto text="No one has uploaded a photo yet" />
      )}
      <SliderImage photos={photosHome} index={index} setIndex={setIndex} />
    </div>
  );
};

export default HomePage;

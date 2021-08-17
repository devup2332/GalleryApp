import React, { MouseEvent } from "react";
import { SliderImageProps } from "../../models/Props/SliderImageProps";
import disableScroll from "disable-scroll";
import { ReactComponent as ArrowLeftSvg } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right.svg";
import "./SliderImage.scss";

const SliderImage = ({ photos, index, setIndex }: SliderImageProps) => {
  const closeSLider = (e: MouseEvent) => {
    const slider = document.querySelector(".slider_image_component");
    if (e.target === slider) {
      slider.classList.remove("visible");
      disableScroll.off();
    }
  };

  const prevSLide = () => {
    if (index === 0) {
      return setIndex(photos.length - 1);
    }

    setIndex(--index);
  };

  const nextSlide = () => {
    if (index === photos.length - 1) {
      return setIndex(0);
    }
    setIndex(++index);
  };
  return (
    <div className="slider_image_component" onClick={closeSLider}>
      {photos?.map((photo) => {
        return (
          <div
            className={
              index === photos.indexOf(photo) 
                ? "image_container on"
                : "image_container"
            }
            style={{ maxWidth: photo.height > 2000 ? "500px" : "1000px" }}
            key={photo.id}
          >
            <img src={photo.secure_url} alt="" />
          </div>
        );
      })}
      <div className="controls">
        <button type="button" className="btn-left" onClick={prevSLide}>
          <ArrowLeftSvg />
        </button>

        <button type="button" className="btn-right" onClick={nextSlide}>
          <ArrowRightSvg />
        </button>
      </div>
    </div>
  );
};

export default SliderImage;

import React from "react";
import { ReactComponent as WaveSvg } from "../../../../assets/icons/wave.svg";
import { ReactComponent as BannerVector } from "../../../../assets/icons/banner-vector.svg";
import { BannerProps } from "../../../../models/Props/BannerProps";
import { Link } from "react-router-dom";

const BannerComponent = ({ user }: BannerProps) => {
  return (
    <div className="banner_component_container">
      <div className="wave_banner_container">
        <WaveSvg />
      </div>

      <div className="banner_body">
        <div className="banner_text">
          <p className="description_banner rightEntrance">
            FIND THOUNDANSD OF PHOTOS FREE OF COPYRIGHT
          </p>
          {user ? null : (
            <Link to="/register" className="btn_join rightEntrance">
              Join Now
            </Link>
          )}
        </div>
        <div
          className="banner_svg_container leftEntrance"
          style={{ animationDelay: user ? "1s" : "1.5s" }}
        >
          <BannerVector />
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;

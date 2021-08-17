import React from "react";
import "./NoPhoto.scss";
import { ReactComponent as CameraSvg } from "../../assets/icons/logo_movile.svg";
import { NoPhotosProps } from "../../models/Props/NoPhotosProps";

const NoPhotos = ({ text }: NoPhotosProps) => {
  return (
    <div className="no-photos-component">
      <CameraSvg />
      <p className="text-no-photos">{text}</p>
    </div>
  );
};

export default NoPhotos;

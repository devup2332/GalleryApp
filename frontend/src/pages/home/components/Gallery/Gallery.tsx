import React from "react";
import UseColumns from "../../../../hooks/UseColumns";
import { GalleryProps } from "../../../../models/Props/GalleryProps";
import { ReactComponent as DownloadSVG } from "../../../../assets/icons/download.svg";
import { ReactComponent as TrashSVG } from "../../../../assets/icons/trash.svg";
import { useHistory } from "react-router";
import disbleScroll from "disable-scroll";

const GalleryComponent = ({ photos, setIndex, setOpen }: GalleryProps) => {
  const { columns } = UseColumns(photos);
  const { location } = useHistory();

  //Handler to open slider
  const openViewPhoto = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const gallery = document.querySelector(".slider_image_component");

    if ((e.target as HTMLDivElement).className === "hover_container") {
      gallery?.classList.add("visible");
      setIndex(index);
      disbleScroll.on();
    }
  };

  //Handler to delete each photo
  const deletePhoto = (index: number) => {
    setOpen?.(true);
    setIndex(index);
  };

  return (
    <div className="gallery_component_container">
      <div className="subcontainer_gallery">
        {columns.map((column) => {
          return (
            <div className="column_gallery" key={column.id}>
              {column.photos?.map((photo) => {
                return (
                  <div
                    className="image_container"
                    key={photo?.id}
                    onClick={(e) => openViewPhoto(photos.indexOf(photo), e)}
                  >
                    <img src={photo.secure_url} alt="" />
                    <div className="hover_container">
                      {location.pathname === "/profile" ? (
                        <button
                          className="btn_delete_photo"
                          onClick={() => deletePhoto(photos.indexOf(photo))}
                        >
                          <TrashSVG />
                        </button>
                      ) : null}
                      <a
                        className="download_image_btn"
                        href={photo.secure_url}
                        target="blank"
                      >
                        <DownloadSVG />
                      </a>
                      <div className="username_information">
                        <div className="image_avatar_container">
                          <img src={photo.user.avatar.secure_url} alt="" />
                        </div>
                        <span className="username_name">{`${photo?.user?.fullName}`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryComponent;

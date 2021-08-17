import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/Header/Header";
import { ReactComponent as WaveSvg } from "../../assets/icons/wave.svg";
import GalleryComponent from "../home/components/Gallery/Gallery";
import { Link } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import { ReactComponent as LoadingSVG } from "../../assets/icons/loading.svg";
import NoPhotos from "../../components/NoPhoto/NoPhoto";
import SliderImage from "../../components/SliderImages/SliderImage";
import DeletePropmt from "../../components/DeletePropmt/DeletePropmt";
import { channel } from "../../app";
import Snackbar from "../../components/Snackbar/Snackbar";

const ProfilePage = () => {
  const { user, photos, getUserPhotos } = useUser();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    channel.bind("photo-deleted", async () => {
      getUserPhotos();
    });
    return () => {
      channel.unbind("photo-deleted");
    };
  }, []);


  return (
    <div className="profile_page_container fadeIn">
      <HeaderComponent user={user} />
      <div className="information_container">
        <div className="wave_profile_container">
          <WaveSvg />
        </div>

        {user ? (
          <div className="body_information_container">
            <div className="profile_image_container">
              <img
                className="user_image"
                src={user?.avatar?.secure_url}
                alt=""
              />
            </div>
            <div className="information_text_container">
              <h1 className="user_fullName">{user?.fullName}</h1>
              <p className="user_email">{user?.email}</p>
              <Link
                to={`/edit-profile/${user?.id}`}
                className="btn_edit_user_profile"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        ) : (
          <LoadingSVG className="loading_container loading" />
        )}
      </div>
      {photos?.length > 0 ? (
        <GalleryComponent
          photos={photos}
          setIndex={setIndex}
          setOpen={setOpen}
        />
      ) : (
        <NoPhotos text="You havent uploaded any photos yet" />
      )}

      <SliderImage photos={photos} index={index} setIndex={setIndex} />
      <DeletePropmt
        open={open}
        setOpen={setOpen}
        photo={photos[index]}
        setOpenSnack={setOpenSnack}
      />
      <Snackbar open={openSnack} message="Photo deleted" />
    </div>
  );
};

export default ProfilePage;

import React, { useEffect, useRef, useState } from "react";
import UseUser from "../../hooks/UseUser";
import HeaderComponent from "../../components/Header/Header";
import { ReactComponent as CameraSvg } from "../../assets/icons/logo_movile.svg";
import Form from "./components/Form/Form";
import Snackbar from "../../components/Snackbar/Snackbar";
import { channel } from "../../app";
import useUpdateUser from "../../hooks/UseUpdateProfile";
import usePhoto from "../../hooks/UsePhotoUpdate";
import Progress from "../../components/Progress/Progress";

let timer: NodeJS.Timer;

const EditProfilePage = () => {
  const { user, getUser } = UseUser();
  const { update } = useUpdateUser();
  const { progress, updatePhoto, progressRef } = usePhoto();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

  const updateUser = async (body: any) => {
    setLoading(true);
    setOpen(false);
    clearTimeout(timer);
    await update(body);
    setLoading(false);
  };

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    await updatePhoto(file);
    progressRef.current?.classList.remove("on");
  };

  useEffect(() => {
    channel.bind("user-photo-updated", ({ message }: any) => {
      getUser();
      setOpen(true);
      setMessage(message);
      timer = setTimeout(() => {
        setMessage("");
        setOpen(false);
        clearTimeout(timer);
      }, 3000);
    });

    channel.bind("user-updated", ({ message }: any) => {
      setOpen(true);
      setMessage(message);
      timer = setTimeout(() => {
        setMessage("");
        setOpen(false);
        clearTimeout(timer);
      }, 3000);
    });

    return () => {
      clearTimeout(timer);

      channel.unbind();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="edit_profile_page fadeIn">
      {user ? <HeaderComponent user={user} /> : null}
      <div className="subcontainer_edit_profile">
        <h1 className="title_edit_profile">EDIT PROFILE</h1>
        <div className="form_container">
          <div
            className="image_profile_container"
            onClick={() => inputFile.current?.click()}
          >
            <img src={user?.avatar.secure_url} alt="" />
            <div className="hover_content">
              <CameraSvg />
              <p className="hover_text">CHANGE PHOTO</p>
            </div>
          </div>
          <input
            type="file"
            name=""
            id=""
            style={{ display: "none" }}
            ref={inputFile}
            onChange={handleFile}
          />
          {user ? (
            <Form user={user} updateUser={updateUser} loading={loading} />
          ) : null}
        </div>
      </div>
      <Snackbar message={message} open={open} />
      <Progress progress={progress} progressRef={progressRef} />
    </div>
  );
};

export default EditProfilePage;

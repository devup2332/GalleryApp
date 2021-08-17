import React, { MouseEvent, useEffect } from "react";
import "./DeletePropmt.scss";
import { ReactComponent as AlertSvg } from "../../assets/icons/alert.svg";
import { DeletePromptProps } from "../../models/Props/DeletePromptProps";
import axios from "axios";
import { environments } from "../../environments";

let timer: NodeJS.Timer;

const DeletePropmt = ({
  open,
  setOpen,
  photo,
  setOpenSnack,
}: DeletePromptProps) => {
  const closePrompt = (e: MouseEvent<HTMLDivElement>) => {
    const container = document.querySelector<HTMLDivElement>(
      ".deletepropmt-container"
    );
    if (e.target === container) {
      setOpen(false);
    }
  };

  const deletePhoto = async () => {
    if (timer) {
      clearTimeout(timer);
    }
    await axios.delete(`${environments.api_uri}/photos/${photo.id}`);
    setOpen(false);
    setOpenSnack(true);

    timer = setTimeout(() => {
      setOpenSnack(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={
        open ? "deletepropmt-container visible" : "deletepropmt-container"
      }
      onClick={closePrompt}
    >
      <div className="modal">
        <h1>Are you sure ?</h1>
        <p>This action cannot be reversed</p>
        <AlertSvg />
        <div className="btns">
          <button type="button" onClick={deletePhoto}>
            Delete
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePropmt;

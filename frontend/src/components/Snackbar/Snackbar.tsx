import React from "react";
import { SnackbarProps } from "../../models/Props/SnackbarProps";
import "./Snackbar.scss";

const Snackbar = ({ message, open }: SnackbarProps) => {
  const closeSnack = () => {
    const snackbar = document.querySelector(".snackbar");
    snackbar?.classList.remove("on");
  };

  return (
    <div className={open ? "snackbar on" : "snackbar"}>
      <span className="snack_message">{message}</span>
      <button className="btn_close_snack" onClick={closeSnack}>
        Close
      </button>
    </div>
  );
};

export default Snackbar;

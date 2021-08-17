import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { environments } from "../../../../environments";
import { channel } from "../../../../app";
import Form from "../Form/Form";

let newWindow: Window;

const RigthSection = () => {
  const { push } = useHistory();

  const registerWithFacebook = async () => {
    newWindow = window.open(`${environments.api_uri}/auth/facebook`) as Window;

    return;
  };

  useEffect(() => {
    channel.bind("register-facebook", (data: any) => {
      newWindow?.close();
      localStorage.setItem("t1ks1ehn", data.token);
      push("/home");
      channel.unbind();
      return;
    });

    channel.bind("login-facebook", (data: any) => {
      newWindow?.close();
      localStorage.setItem("t1ks1ehn", data.token);
      push("/home");
      channel.unbind();
      return;
    });

    return;
  }, [push]);

  return (
    <div className="container_form_register fadeIn">
      <div className="subcontainer_form_register">
        <h1 className="title_form">JOIN NOW</h1>
        <p className="subtitle_form">
          Join today free to start to get amazing images for free
        </p>

        <button className="btn_join_facebook" onClick={registerWithFacebook}>
          Join with facebook
        </button>

        <span className="or_line">O</span>
        <Form />
        <p className="question_register">
          You have an account ?{" "}
          <Link className="link_question" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RigthSection;

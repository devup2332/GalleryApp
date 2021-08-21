import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { environments } from "../../environments";
import { Credentials } from "../../models/Interfaces/Creadentials";
import Form from "./components/Form/Form";
import Snackbar from "../../components/Snackbar/Snackbar";
import { channel } from "../../app";
import { ReactComponent as Vector } from "../../assets/icons/login-vector.svg";
import { ReactComponent as WaveSvg } from "../../assets/icons/wave_vector_login.svg";

let myWindow: Window;
let timer: NodeJS.Timer;

const LoginPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loginUser = async (credentials: Credentials) => {
    setLoading(true);

    if (open) {
      clearTimeout(timer);
      setOpen(false);
    }
    const { data } = await axios.post(
      `${environments.api_uri}/auth/login`,
      credentials
    );

    setLoading(false);

    if (!data.status) {
      setOpen(true);
      setMessage(data.message);

      return (timer = setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 3000));
    }

    localStorage.setItem("t1ks1ehn", data.token);
    return history.push("/home");
  };

  const loginFacebook = () => {
    myWindow = window.open(
      `https://my-gallery.xyz/api/auth/facebook`
    ) as Window;
  };

  useEffect(() => {
    channel.bind("login-facebook", (data: any) => {
      localStorage.setItem("t1ks1ehn", data.token);
      channel.unbind();
      myWindow?.close();
      history.push("/home");
    });

    channel.bind("register-facebook", (data: any) => {
      myWindow?.close();
      localStorage.setItem("t1ks1ehn", data.token);
      history.push("/home");
      channel.unbind();
      return;
    });
    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <div className="login_container">
      <div className="right_container fadeIn">
        <WaveSvg className="wave_login" />
        <div className="vector_container downEntrance">
          <Vector />
        </div>
      </div>
      <div className="left_container fadeIn">
        <div className="subcontainer">
          <h1 className="title_page">LOGIN</h1>

          <h2 className="subtitle_page">WELCOME BACK</h2>

          <button className="btn_login_facebook" onClick={loginFacebook}>
            Login With Facebook
          </button>

          <span className="or">O</span>

          <Form loginUser={loginUser} loading={loading} />

          <p className="question_login">
            You still dont have an account ?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Snackbar message={message} open={open} />
    
    </div>
  );
};

export default LoginPage;

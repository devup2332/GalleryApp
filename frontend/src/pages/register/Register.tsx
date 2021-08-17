import React from "react";
import RigthSection from "./components/RightSection/RightSection";
import { ReactComponent as WaveSvg } from "../../assets/icons/wave_register.svg";
import { ReactComponent as RegisterVector } from "../../assets/icons/register-vector.svg";

const RegisterPage = () => {
  return (
    <div className="register_page_container">
      <div className="left_container fadeIn">
      <WaveSvg className="wave_register"/>
        <RegisterVector className="register_vector downEntrance" />
      </div>
      <RigthSection />
    </div>
  );
};

export default RegisterPage;

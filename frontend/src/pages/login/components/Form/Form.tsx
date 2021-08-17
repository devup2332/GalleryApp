import React from "react";
import { useForm } from "react-hook-form";
import { FormLoginProps } from "../../../../models/Props/FormLoginProps";
import { ReactComponent as LoadingSVG } from "../../../../assets/icons/loading.svg";
import { environments } from "../../../../environments";

const Form = ({ loginUser, loading }: FormLoginProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(loginUser)}>
      <div className="controller">
        <input
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "Enter you email",
            },
            pattern: {
              message: "Invalid Email",
              value: environments.email_pattern,
            },
          })}
          placeholder="Email"
          autoComplete="off"
        />
        <p className="message_error">{errors.email?.message}</p>
      </div>

      <div className="controller">
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Enter your password",
            },
          })}
          placeholder="Password"
          autoComplete="off"
        />
        <p className="message_error">{errors.password?.message}</p>
      </div>

      <button className="btn_login" type="submit">
        {loading ? <LoadingSVG className="loading" /> : null}
        Login
      </button>
    </form>
  );
};

export default Form;

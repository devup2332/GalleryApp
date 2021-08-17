import React, { useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { environments } from "../../../../environments";
import { RegisterFields } from "../../../../models/Interfaces/RegisterFields";
import { ReactComponent as LoadingSVG } from "../../../../assets/icons/loading.svg";

const Form = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const password = useRef();
  password.current = watch("password", "");

  const registerUser = async (user: RegisterFields) => {
    setLoading(true);
    delete user.confirm_password;
    const { data } = await axios.post(
      `${environments.api_uri}/auth/register`,
      user
    );
    setLoading(false);
    localStorage.setItem("t1ks1ehn", data.token);
    history.push("/home");
    return;
  };

  const validateEmail = async (email: string) => {
    const { data } = await axios.post(
      `${environments.api_uri}/auth/validate_email`,
      {
        email,
      }
    );
    if (data.status) {
      return true;
    }
    return data.message;
  };

  return (
    <form className="form" onSubmit={handleSubmit(registerUser)}>
      <div className="input_container">
        <input
          className="input_form_register"
          {...register("fullName", {
            required: {
              value: true,
              message: "Enter your name",
            },
          })}
          type="text"
          autoComplete="off"
          placeholder="Full Name"
        />
        <p className="error_message visible">{errors.fullName?.message}</p>
      </div>

      <div className="input_container">
        <input
          className="input_form_register"
          {...register("email", {
            required: {
              value: true,
              message: "Please enter your email",
            },
            pattern: {
              value: environments.email_pattern,
              message: "Email is invalid",
            },
            validate: {
              onUse: validateEmail,
            },
          })}
          autoComplete="off"
          type="text"
          placeholder="Email"
        />
        <p className="error_message visible">{errors.email?.message}</p>
      </div>

      <div className="input_container">
        <input
          className="input_form_register"
          {...register("phone", {
            required: {
              value: true,
              message: "Enter a phone number",
            },
            pattern: {
              value: environments.number_pattern,
              message: "Just numbers",
            },
          })}
          name="phone"
          type="text"
          autoComplete="off"
          placeholder="Phone"
        />
        <p className="error_message visible">{errors.phone?.message}</p>
      </div>

      <div className="input_container">
        <input
          className="input_form_register"
          {...register("password", {
            required: {
              value: true,
              message: "Enter your password",
            },
            minLength: {
              value: 9,
              message: "At least 9 characters",
            },
          })}
          name="password"
          autoComplete="off"
          type="password"
          placeholder="Password"
        />
        <p className="error_message visible">{errors.password?.message}</p>
      </div>

      <div className="input_container">
        <input
          className="input_form_register"
          {...register("confirm_password", {
            required: {
              value: true,
              message: "Confirm your password",
            },
            validate: {
              noEqual: (value) => {
                if (value !== password.current) {
                  return "Passwords doesnt match";
                }
                return true;
              },
            },
          })}
          autoComplete="off"
          type="password"
          placeholder="Confirm Password"
        />
        <p className="error_message visible">
          {errors.confirm_password?.message}
        </p>
      </div>

      <button type="submit" className="btn_register">
        {loading ? <LoadingSVG className="loading" /> : null}
        Register
      </button>
    </form>
  );
};

export default Form;

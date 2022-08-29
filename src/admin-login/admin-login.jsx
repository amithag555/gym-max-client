import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectErrorState, userLoginSlice } from "../redux/reducers/authSlice";
import { TOKEN_KEY } from "../config";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import logo from "../images/logo-full.png";

export default function AdminLogin() {
  const errorState = useSelector(selectErrorState);
  const currentToken = useSelector(selectCurrentToken);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (errorState) {
      console.log("Error useEffect");
      console.log(errorState);
    }
  }, [errorState]);

  useEffect(() => {
    if (currentToken || localStorage[TOKEN_KEY]) {
      navigation("/admin");
    }
  }, [currentToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleRegistration = (data) => {
    const userDetails = {
      username: data.username,
      password: data.password,
    };

    dispatch(userLoginSlice(userDetails));
  };

  const registerOptions = {
    username: {
      required: "Username is required",
      maxLength: {
        value: 50,
        message: "Username can have a maximum 50 characters",
      },
    },
    password: {
      required: "Password is required",
      maxLength: {
        value: 25,
        message: "Password can have a maximum 25 characters",
      },
    },
  };

  return (
    <div className="row p-0 m-0 align-items-center justify-content-center" style={{ height: "100vh" }}>
      {localStorage[TOKEN_KEY] ? (
        <React.Fragment></React.Fragment>
      ) : (
        <div className="col-md-3 rounded-3 p-0" style={{ height: "600px" }}>
          <div className="login_div p-5 h-100 rounded-3">
            <div className="col-6 mx-auto mb-3 mt-3">
              <img src={logo} alt="logo" className="w-100" />
            </div>

            <div className="col-10 mx-auto text-center mb-5">
              <h6 className="p-0 m-0">Sign in your account</h6>
            </div>

            {errorState && (
              <div className="col-9 mx-auto text-center mb-3">
                <h6 className="p-0 m-0 text-danger">{errorState}</h6>
              </div>
            )}

            <form className="" onSubmit={handleSubmit(handleRegistration)}>
              <div className="mb-5 bg-white rounded-3">
                <TextField
                  className="col-12"
                  label="Username"
                  variant="outlined"
                  {...register("username", registerOptions.username)}
                />

                <div className="background_color_blue">
                  <small className=" text-danger">{errors?.username && errors.username.message}</small>
                </div>
              </div>

              <div className="mb-5 bg-white rounded-3">
                <TextField
                  type="password"
                  className="col-12"
                  label="Password"
                  variant="outlined"
                  {...register("password", registerOptions.password)}
                />

                <div className="background_color_blue">
                  <small className="text-danger">{errors?.password && errors.password.message}</small>
                </div>
              </div>

              <div className="rounded-3 p-0 bg-white text-center">
                <button className="login_btn_div p-3 w-100">Sign Me In</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTitle } from "../redux/reducers/generalSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updatePasswordService } from "../services/member.service";
import { selectCurrentUser, updateCurrentUser } from "../redux/reducers/authSlice";
import { changeIsFirstLoginSlice } from "../redux/reducers/memberSlice";

export default function UpdatePasswordFormMember() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(setCurrentTitle("Change Password"));
  }, []);

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required").max(25, "Password can have a maximum 25 characters"),
    reTypePassword: Yup.string()
      .required("Re-type password is required")
      .max(25, "Re-type password can have a maximum 25 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const handleRegistration = (data) => {
    const newPassword = {
      password: data.password,
    };

    updatePassword(newPassword);

    if (currentUser.isFirstLogin) {
      dispatch(changeIsFirstLoginSlice());
    }
  };

  const updatePassword = async (_newPassword) => {
    try {
      const response = await updatePasswordService(_newPassword);
      if (response.id) {
        if (currentUser.isFirstLogin) {
          dispatch(updateCurrentUser(response));
          navigation("/");
        } else {
          navigation("/settings");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2">
      <div className="py-2 px-3 bg-white rounded-3 shadow">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="mb-3 mt-2">
            <TextField
              className="col-12"
              label="New password"
              type="password"
              variant="outlined"
              {...register("password")}
            />

            <div>
              <small className="text-danger">{errors?.password && errors.password.message}</small>
            </div>
          </div>

          <div className="mb-4">
            <TextField
              className="col-12"
              label="Re-type new password"
              type="password"
              variant="outlined"
              {...register("reTypePassword")}
            />

            <div>
              <small className="text-danger">{errors?.reTypePassword && errors.reTypePassword.message}</small>
            </div>
          </div>

          <div className="mt-2 row m-0 p-0 justify-content-center">
            <div className="p-0 m-0 mb-3">
              <button className="confirm_training_plan_btn w-100">Update password</button>
            </div>

            <div className="p-0 m-0 mb-1">
              <button
                type="button"
                className="cancel_training_plan_btn w-100"
                onClick={(e) => {
                  navigation("/settings");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

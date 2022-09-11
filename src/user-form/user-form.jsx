import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createUserService, editUserByIdService } from "../services/user.service";

export default function UserForm(props) {
  const statusArr = ["ACTIVE", "INACTIVE"];
  const roleArr = ["ADMIN", "RECEPTION", "TRAINER"];
  const [open, setOpen] = useState(false);
  const [errorState, setErrorState] = useState({});

  const status = {
    true: "ACTIVE",
    false: "INACTIVE",
  };

  useEffect(() => {
    if (props.isEditMode || props.isCreationMode) {
      setOpen(true);
    }
  }, [props.isEditMode, props.isCreationMode]);

  useEffect(() => {
    if (props.selectedUser.id && !props.isCreationMode) {
      let tempUser = {
        username: props.selectedUser.username,
        firstName: props.selectedUser.firstName,
        lastName: props.selectedUser.lastName,
        role: props.selectedUser.role,
        isActive: status[props.selectedUser.isActive],
        password: "*****",
        reTypePassword: "*****",
      };

      reset(tempUser);
    } else {
      let tempUser = {
        isActive: status[true],
        role: roleArr[1],
      };

      reset(tempUser);
    }
  }, [props.isCreationMode, props.isEditMode]);

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required").max(25, "Password can have a maximum 25 characters"),
    reTypePassword: Yup.string()
      .required("Re-type password is required")
      .max(25, "Re-type password can have a maximum 25 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    username: Yup.string().required("Username is required").max(50, "Username can have a maximum 50 characters"),
    firstName: Yup.string().max(50, "First name can have a maximum 50 characters").nullable(true),
    lastName: Yup.string().max(50, "Last name can have a maximum 50 characters").nullable(true),
    isActive: Yup.string().required("Status is required"),
    role: Yup.string().required("Permission is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const handleRegistration = (data) => {
    console.log(data);
    if (props.isEditMode) {
      const payload = {
        userToEdit: {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          isActive: data.isActive === statusArr[0] ? true : false,
          role: data.role,
        },

        userId: props.selectedUser.id,
      };

      editUserById(payload);
    } else {
      const newUser = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        isActive: data.isActive === statusArr[0] ? true : false,
        role: data.role,
        password: data.password,
      };

      createUser(newUser);
    }
  };

  const handleCloseBtn = () => {
    setOpen(false);

    if (props.isEditMode) {
      props.setIsEditMode(false);
    } else {
      props.setIsCreationMode(false);
    }
  };

  const createUser = async (_newUser) => {
    try {
      const response = await createUserService(_newUser);

      if (response.id) {
        setOpen(false);
        props.setIsCreationMode(false);
        props.setIsChangeMode(true);
        setErrorState({});
      }
    } catch (error) {
      setErrorState(error.response.data);
    }
  };

  const editUserById = async (_payload) => {
    try {
      const response = await editUserByIdService(_payload);

      if (response.id) {
        setOpen(false);
        props.setIsEditMode(false);
        props.setIsChangeMode(true);
        props.setSelectedUser(response);
        setErrorState({});
      }
    } catch (error) {
      setErrorState(error.response.data);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <div className="row justify-content-between align-items-center">
            {props.isCreationMode ? (
              <div className="col-8">NEW USER</div>
            ) : (
              <div className="col-8">{props.selectedUser.username}</div>
            )}
          </div>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(handleRegistration)} style={{ width: "500px" }}>
            <div className="mb-4 mt-2">
              <TextField className="col-12" label="Username" variant="outlined" {...register("username")} />

              <div>
                {errorState.statusCode === 409 ? (
                  <small className="text-danger">{errorState.message}</small>
                ) : (
                  <small className="text-danger">{errors?.username && errors.username.message}</small>
                )}
              </div>
            </div>

            <div className="mb-4 mt-2">
              <TextField className="col-12" label="First name" variant="outlined" {...register("firstName")} />

              <div>
                <small className="text-danger">{errors?.firstName && errors.firstName.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField className="col-12" label="Last name" variant="outlined" {...register("lastName")} />

              <div>
                <small className="text-danger">{errors?.lastName && errors.lastName.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <Autocomplete
                freeSolo
                disableClearable
                value={!props.isCreationMode && props.selectedUser.id ? props.selectedUser.role : roleArr[1]}
                options={roleArr.map((item) => {
                  return { label: item };
                })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select permission"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    {...register("role")}
                  />
                )}
              />

              <div>
                <small className="text-danger">{errors?.role && errors.role.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <Autocomplete
                freeSolo
                disableClearable
                value={!props.isCreationMode && props.selectedUser.id ? status[props.selectedUser.isActive] : status[true]}
                options={statusArr.map((item) => {
                  return { label: item };
                })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select status"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    {...register("isActive")}
                  />
                )}
              />

              <div>
                <small className="text-danger">{errors?.isActive && errors.isActive.message}</small>
              </div>
            </div>

            {props.isCreationMode && (
              <React.Fragment>
                <div className="mb-4">
                  <TextField
                    className="col-12"
                    label="Password"
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
                    label="Re-type password"
                    type="password"
                    variant="outlined"
                    {...register("reTypePassword")}
                  />

                  <div>
                    <small className="text-danger">{errors?.reTypePassword && errors.reTypePassword.message}</small>
                  </div>
                </div>
              </React.Fragment>
            )}

            <DialogActions>
              <Button type="submit">Save</Button>
              <Button onClick={handleCloseBtn}>Close</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updatePasswordService } from "../services/user.service";

export default function UpdatePasswordFormAdmin(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.isUpdatePasswordMode) {
      setOpen(true);
      reset({});
    }
  }, [props.isUpdatePasswordMode]);

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
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const handleRegistration = (data) => {
    const payload = {
      newPassword: {
        password: data.password,
      },

      userId: props.selectedUser.id,
    };

    updatePassword(payload);
  };

  const handleCloseBtn = () => {
    setOpen(false);
    props.setIsUpdatePasswordMode(false);
  };

  const updatePassword = async (_payload) => {
    try {
      const response = await updatePasswordService(_payload);

      if (response.id) {
        setOpen(false);
        props.setIsUpdatePasswordMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{`UPDATE ${props.selectedUser.username.toUpperCase()}'S PASSWORD`}</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(handleRegistration)} style={{ width: "500px" }}>
            <div className="mb-4 mt-2">
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

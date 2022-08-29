import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createMemberSlice,
  editMemberByIdSlice,
  selectCurrentMember,
  selectErrorState,
} from "../redux/reducers/memberSlice";

export default function MemberForm(props) {
  const statusArr = ["ACTIVE", "CANCELLED", "SUSPEND"];
  const [open, setOpen] = useState(false);
  const currentMember = useSelector(selectCurrentMember);
  const errorState = useSelector(selectErrorState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isEditMode || props.isCreationMode) {
      setOpen(true);
    }
  }, [props.isEditMode, props.isCreationMode]);

  useEffect(() => {
    if (!errorState.message) {
      setOpen(false);

      if (props.isEditMode) {
        props.setIsEditMode(false);
      } else if (props.isCreationMode) {
        props.setIsCreationMode(false);
        props.setIsChangeMode(true);
      }
    }
  }, [errorState]);

  useEffect(() => {
    if (currentMember.id && !props.isCreationMode) {
      let tempMember = {
        firstName: currentMember.firstName,
        lastName: currentMember.lastName,
        address: currentMember.address,
        phoneNumber: currentMember.phoneNumber,
        email: currentMember.email,
        expiredDate: `${new Date(currentMember.expiredDate).getFullYear()}-${
          new Date(currentMember.expiredDate).getMonth() + 1 < 10
            ? `0${new Date(currentMember.expiredDate).getMonth() + 1}`
            : new Date(currentMember.expiredDate).getMonth() + 1
        }-${
          new Date(currentMember.expiredDate).getDate() < 10
            ? `0${new Date(currentMember.expiredDate).getDate()}`
            : new Date(currentMember.expiredDate).getDate()
        }`,
        creationDate: `${new Date(currentMember.creationDate).getFullYear()}-${
          new Date(currentMember.creationDate).getMonth() + 1 < 10
            ? `0${new Date(currentMember.creationDate).getMonth() + 1}`
            : new Date(currentMember.creationDate).getMonth() + 1
        }-${
          new Date(currentMember.creationDate).getDate() < 10
            ? `0${new Date(currentMember.creationDate).getDate()}`
            : new Date(currentMember.creationDate).getDate()
        }`,
        status: currentMember.status,
      };

      reset(tempMember);
    } else {
      let tempMember = {
        expiredDate: `${new Date().getFullYear() + 1}-${
          new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
        }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
        creationDate: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
        }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
        status: statusArr[0],
      };

      reset(tempMember);
    }
  }, [props.isCreationMode, props.isEditMode]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const registerOptions = {
    firstName: {
      required: "First name is required",
      maxLength: {
        value: 50,
        message: "First name can have a maximum 50 characters",
      },
    },
    lastName: {
      required: "Last name name is required",
      maxLength: {
        value: 50,
        message: "Last name can have a maximum 50 characters",
      },
    },
    address: {
      required: false,
      maxLength: {
        value: 100,
        message: "Address can have a maximum 100 characters",
      },
    },
    phoneNumber: {
      required: "Phone number is required",
      maxLength: {
        value: 10,
        message: "Phone number can have a maximum 10 characters",
      },
    },
    email: {
      required: "Email is required",
      maxLength: {
        value: 100,
        message: "Email can have a maximum 100 characters",
      },
    },
    expiredDate: {
      required: "Expired date is required",
    },
    creationDate: {
      required: "Joining date is required",
    },
    status: {
      required: "Status is required",
    },
  };

  const handleRegistration = (data) => {
    if (props.isEditMode) {
      const payload = {
        memberToEdit: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          expiredDate: data.expiredDate,
          creationDate: data.creationDate,
          status: data.status,
        },

        memberId: currentMember.id,
      };

      dispatch(editMemberByIdSlice(payload));
    } else {
      const newMember = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        expiredDate: data.expiredDate,
        creationDate: data.creationDate,
        status: data.status,
      };

      dispatch(createMemberSlice(newMember));
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

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <div className="row justify-content-between align-items-center">
            {props.isCreationMode ? (
              <div className="col-8">NEW MEMBER</div>
            ) : (
              <div className="col-8">{currentMember.fullName}</div>
            )}
          </div>
        </DialogTitle>

        <DialogContent>
          <form className="" onSubmit={handleSubmit(handleRegistration)} style={{ width: "500px" }}>
            <div className="mb-4 mt-2">
              <TextField
                className="col-12"
                label="First name"
                variant="outlined"
                {...register("firstName", registerOptions.firstName)}
              />

              <div>
                <small className="text-danger">{errors?.firstName && errors.firstName.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Last name"
                variant="outlined"
                {...register("lastName", registerOptions.lastName)}
              />

              <div>
                <small className="text-danger">{errors?.lastName && errors.lastName.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Address"
                variant="outlined"
                {...register("address", registerOptions.address)}
              />

              <div>
                <small className="text-danger">{errors?.address && errors.address.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Phone number"
                variant="outlined"
                {...register("phoneNumber", registerOptions.phoneNumber)}
              />

              <div>
                <small className="text-danger">{errors?.phoneNumber && errors.phoneNumber.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Email"
                type="email"
                variant="outlined"
                {...register("email", registerOptions.email)}
              />

              <div>
                {errorState.statusCode === 409 ? (
                  <small className="text-danger">{errorState.message}</small>
                ) : (
                  <small className="text-danger">{errors?.email && errors.email.message}</small>
                )}
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Joining date"
                type="date"
                variant="outlined"
                {...register("creationDate", registerOptions.creationDate)}
              />

              <div>
                <small className="text-danger">{errors?.creationDate && errors.creationDate.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Expired date"
                type="date"
                variant="outlined"
                {...register("expiredDate", registerOptions.expiredDate)}
              />

              <div>
                <small className="text-danger">{errors?.expiredDate && errors.expiredDate.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <Autocomplete
                freeSolo
                disableClearable
                value={!props.isCreationMode && currentMember.id ? currentMember.status : statusArr[0]}
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
                    {...register("status", registerOptions.status)}
                  />
                )}
              />

              <div>
                <small className="text-danger">{errors?.status && errors.status.message}</small>
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

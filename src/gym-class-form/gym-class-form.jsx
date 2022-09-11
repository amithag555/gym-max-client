import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Autocomplete, Switch } from "@mui/material";
import { editGymClassService, deleteGymClassService, createGymClassService } from "../services/gym-class.service";
import DisplayAlert from "../helpers/display-alert";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import { ROLES } from "../config";

export default function GymClassForm(props) {
  const typeArr = ["SPINNING", "BOXING", "SWIMMING", "BODYSHAPE", "YOGA"];
  const daysArr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  const [isActive, setIsActive] = useState(true);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [open, setOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (props.isEditMode || props.isCreationMode) {
      setOpen(true);
    }
  }, [props.isEditMode, props.isCreationMode]);

  useEffect(() => {
    if (props.gymClassToEdit.id && !props.isCreationMode) {
      setIsActive(props.gymClassToEdit.isActive);

      let tempGymClass = {
        type: props.gymClassToEdit.type,
        trainer: props.gymClassToEdit.trainer,
        startHour: `${
          new Date(props.gymClassToEdit.startHour).getUTCHours() < 10
            ? `0${new Date(props.gymClassToEdit.startHour).getUTCHours()}`
            : new Date(props.gymClassToEdit.startHour).getUTCHours()
        }:${
          new Date(props.gymClassToEdit.startHour).getUTCMinutes() < 10
            ? `0${new Date(props.gymClassToEdit.startHour).getUTCMinutes()}`
            : new Date(props.gymClassToEdit.startHour).getUTCMinutes()
        }`,
        day: props.gymClassToEdit.day,
        duration: props.gymClassToEdit.duration,
        roomNumber: props.gymClassToEdit.roomNumber,
        maxMembers: props.gymClassToEdit.maxMembers,
        isActive: props.gymClassToEdit.isActive,
      };

      reset(tempGymClass);
    } else {
      reset({});
    }
  }, [props.gymClassToEdit, props.isCreationMode]);

  useEffect(() => {
    if (isDeleteConfirmation) {
      setOpen(false);
      deleteGymClass(props.gymClassToEdit.id);
      setIsDeleteConfirmation(false);
    }
  }, [isDeleteConfirmation]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const registerOptions = {
    type: {
      required: "Type is required",
    },
    trainer: {
      required: "Trainer name is required",
      maxLength: {
        value: 50,
        message: "Trainer name can have a maximum 50 characters",
      },
    },
    day: {
      required: "Day is required",
    },
    duration: {
      required: "Duration is required",
      max: {
        value: 90,
        message: "Duration can be a maximum 90 minutes",
      },
    },
    roomNumber: {
      required: "Studio number is required",
      max: {
        value: 30,
        message: "Studio number can be a maximum 30",
      },
    },
    maxMembers: {
      required: "Max members amount is required",
      max: {
        value: 100,
        message: "Max members amount can be a maximum 100",
      },
    },
    startHour: {
      required: "Start hour is required",
    },
  };

  const handleRegistration = (data) => {
    setOpen(false);

    if (props.isEditMode) {
      props.setIsEditMode(false);

      const gymClassToEdit = {
        type: data.type,
        trainer: data.trainer,
        day: data.day,
        duration: Number(data.duration),
        roomNumber: Number(data.roomNumber),
        maxMembers: Number(data.maxMembers),
        isActive: isActive,
        startHour: data.startHour,
      };

      editGymClass(gymClassToEdit, props.gymClassToEdit.id);
    } else {
      props.setIsCreationMode(false);

      const newGymClass = {
        type: data.type,
        trainer: data.trainer,
        day: data.day,
        duration: Number(data.duration),
        roomNumber: Number(data.roomNumber),
        maxMembers: Number(data.maxMembers),
        isActive: isActive,
        startHour: data.startHour,
      };

      createGymClass(newGymClass);
    }
  };

  const createGymClass = async (_newGymClass) => {
    try {
      const response = await createGymClassService(_newGymClass);

      if (response.id) {
        props.setIsChanged(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const editGymClass = async (_gymClassToEdit, _id) => {
    try {
      const response = await editGymClassService(_gymClassToEdit, _id);

      if (response.id) {
        props.setIsChanged(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteGymClass = async (_gymClassId) => {
    try {
      const response = await deleteGymClassService(_gymClassId);
      if (response.id) {
        props.setIsChanged(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCloseBtn = () => {
    setOpen(false);

    if (props.isEditMode) {
      props.setIsEditMode(false);

      if (isActive !== props.gymClassToEdit.isActive) {
        setIsActive(props.gymClassToEdit.isActive);
      }
    } else {
      props.setIsCreationMode(false);
    }
  };

  const handleDeleteBtn = () => {
    setIsDeleteMode(true);
  };

  const handleChange = (event) => {
    setIsActive(event.target.checked);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <div className="row justify-content-between align-items-center">
            {props.isCreationMode ? (
              <div className="col-8">NEW CLASS</div>
            ) : (
              <div className="col-8">{props.gymClassToEdit.type} CLASS</div>
            )}

            {!props.isCreationMode && (
              <div className="col-2">
                <Switch checked={isActive} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
              </div>
            )}
          </div>
        </DialogTitle>

        <DialogContent>
          <form className="" onSubmit={handleSubmit(handleRegistration)} style={{ width: "500px" }}>
            <div className="my-4">
              <Autocomplete
                freeSolo
                disableClearable
                value={!props.isCreationMode && props.gymClassToEdit.type ? props.gymClassToEdit.type : ""}
                options={typeArr.map((item) => {
                  return { label: item };
                })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Type"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    {...register("type", registerOptions.type)}
                  />
                )}
              />

              <div>
                <small className="text-danger">{errors?.type && errors.type.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Trainer name"
                variant="outlined"
                {...register("trainer", registerOptions.trainer)}
              />

              <div>
                <small className="text-danger">{errors?.trainer && errors.trainer.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <Autocomplete
                freeSolo
                disableClearable
                value={!props.isCreationMode && props.gymClassToEdit.day ? props.gymClassToEdit.day : ""}
                options={daysArr.map((item) => {
                  return { label: item };
                })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Day"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    {...register("day", registerOptions.day)}
                  />
                )}
              />

              <div>
                <small className="text-danger">{errors?.day && errors.day.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Duration"
                type="number"
                variant="outlined"
                {...register("duration", registerOptions.duration)}
              />

              <div>
                <small className="text-danger">{errors?.duration && errors.duration.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Studio number"
                type="number"
                variant="outlined"
                {...register("roomNumber", registerOptions.roomNumber)}
              />

              <div>
                <small className="text-danger">{errors?.roomNumber && errors.roomNumber.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Max members"
                type="number"
                variant="outlined"
                {...register("maxMembers", registerOptions.maxMembers)}
              />

              <div>
                <small className="text-danger">{errors?.maxMembers && errors.maxMembers.message}</small>
              </div>
            </div>

            <div className="mb-4">
              <TextField
                className="col-12"
                label="Start hour"
                type="time"
                variant="outlined"
                {...register("startHour", registerOptions.startHour)}
              />

              <div>
                <small className="text-danger">{errors?.startHour && errors.startHour.message}</small>
              </div>
            </div>

            <DialogActions>
              {!props.isCreationMode && currentUser.role === ROLES.ADMIN && (
                <Button onClick={handleDeleteBtn} className="text-danger">
                  delete
                </Button>
              )}

              <DisplayAlert
                title="Delete"
                contentText="Are you sure you want to delete this item?"
                isTowButtons={true}
                isDeleteMode={isDeleteMode}
                setIsDeleteMode={setIsDeleteMode}
                setIsDeleteConfirmation={setIsDeleteConfirmation}
                setIsEditMode={props.setIsEditMode}
              />

              <Button type="submit">Save</Button>

              <Button onClick={handleCloseBtn}>Close</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

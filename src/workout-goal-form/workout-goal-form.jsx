import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import {
  selectCurrentWorkoutGoal,
  createWorkoutGoalSlice,
  editCurrentWorkoutGoalSlice,
} from "../redux/reducers/workoutGoalSlice";

export default function WorkoutGoalForm(props) {
  const [open, setOpen] = useState(false);
  const currentWorkoutGoal = useSelector(selectCurrentWorkoutGoal);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isEditMode || props.isCreationMode) {
      setOpen(true);

      if (props.isEditMode) {
        reset({ trainingNumber: currentWorkoutGoal.trainingNumber });
      } else {
        reset({});
      }
    }
  }, [props.isEditMode, props.isCreationMode]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const registerOptions = {
    trainingNumber: {
      required: "Training number is required",
      max: {
        value: 100,
        message: "Training number can be a maximum 100",
      },
    },
  };

  const handleRegistration = (data) => {
    setOpen(false);

    if (props.isEditMode) {
      props.setIsEditMode(false);

      const payload = {
        workoutGoalToEdit: {
          trainingNumber: Number(data.trainingNumber),
        },

        workoutGoalId: currentWorkoutGoal.id,
      };

      dispatch(editCurrentWorkoutGoalSlice(payload));
    } else {
      props.setIsCreationMode(false);

      const newWorkoutGoal = {
        trainingNumber: Number(data.trainingNumber),
        memberId: currentUser.id,
      };

      dispatch(createWorkoutGoalSlice(newWorkoutGoal));
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
        <DialogTitle>{props.isCreationMode ? <div>NEW WORKOUT GOAL</div> : <div>EDIT WORKOUT GOAL</div>}</DialogTitle>

        <DialogContent style={{ width: "310px" }}>
          <form className="" onSubmit={handleSubmit(handleRegistration)}>
            <div className="mb-3">
              <TextField
                label="Training number"
                variant="standard"
                {...register("trainingNumber", registerOptions.trainingNumber)}
              />

              <div>
                <small className="text-danger">{errors?.trainingNumber && errors.trainingNumber.message}</small>
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

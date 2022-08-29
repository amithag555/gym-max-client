import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import RefreshIcon from "@mui/icons-material/Refresh";
import BikeScooterRoundedIcon from "@mui/icons-material/BikeScooterRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editPlanItemExerciseSlice, selectTrainingPlanErrors } from "../redux/reducers/trainingPlanSlice";
import { Tooltip } from "@mui/material";

export default function EditPlanItemExerciseForm(props) {
  const dispatch = useDispatch();
  const trainingPlanErrors = useSelector(selectTrainingPlanErrors);

  useEffect(() => {
    console.log(trainingPlanErrors);
  }, [trainingPlanErrors]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleRegistration = (data) => {
    props.setExerciseEditMode(false);

    const payload = {
      exerciseToUpdate: {
        title: data.title,
        setsNumber: Number(data.setsNumber),
        repetitionsNumber: Number(data.repetitionsNumber),
        machineNumber: data.machineNumber,
        weight: Number(data.weight),
      },
      id: props.item.id,
    };

    dispatch(editPlanItemExerciseSlice(payload));
  };

  const registerOptions = {
    title: {
      required: "Title is required",
      maxLength: {
        value: 50,
        message: "Title can have a maximum 50 characters",
      },
    },
    setsNumber: {
      required: true,
    },
    repetitionsNumber: {
      required: true,
    },
    weight: {
      required: false,
    },
    machineNumber: {
      required: false,
    },
  };

  return (
    <div>
      <form className="mt-3 shadow rounded-3" onSubmit={handleSubmit(handleRegistration)}>
        <div className="row align-items-center justify-content-between p-0 m-0 py-2 mb-1">
          <div className="col-8">
            <TextField
              label="Title"
              variant="standard"
              type="text"
              defaultValue={props.item.title}
              {...register("title", registerOptions.title)}
            />

            <div>
              <small className="text-danger">{errors?.title && errors.title.message}</small>
            </div>
          </div>

          <div className="col-auto">
            <button className="confirm_form_btn">
              <CheckRoundedIcon />
            </button>
          </div>
        </div>

        <div className="row justify-content-between p-0 m-0 p-2">
          <div className="col-2 border text-center rounded-3">
            <div className="p-1">
              <Tooltip title="Sets number" enterTouchDelay={0}>
                <SportsMartialArtsIcon />
              </Tooltip>
            </div>

            <div>
              <TextField
                variant="standard"
                type="number"
                defaultValue={props.item.setsNumber}
                {...register("setsNumber", registerOptions.setsNumber)}
              />
            </div>
          </div>

          <div className="col-2 border text-center rounded-3">
            <div className="p-1">
              <Tooltip title="Repetitions number" enterTouchDelay={0}>
                <RefreshIcon />
              </Tooltip>
            </div>

            <div>
              <TextField
                variant="standard"
                type="number"
                defaultValue={props.item.repetitionsNumber}
                {...register("repetitionsNumber", registerOptions.repetitionsNumber)}
              />
            </div>
          </div>

          <div className="col-2 border text-center rounded-3">
            <div className="p-1">
              <Tooltip title="Weight" enterTouchDelay={0}>
                <FitnessCenterIcon />
              </Tooltip>
            </div>

            <div>
              <TextField
                variant="standard"
                type="number"
                defaultValue={props.item.weight}
                {...register("weight", registerOptions.weight)}
              />
            </div>
          </div>

          <div className="col-2 border text-center rounded-3">
            <div className="p-1">
              <Tooltip title="Machine number" enterTouchDelay={0}>
                <BikeScooterRoundedIcon />
              </Tooltip>
            </div>

            <div>
              <TextField
                variant="standard"
                type="text"
                defaultValue={props.item.machineNumber}
                {...register("machineNumber", registerOptions.machineNumber)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

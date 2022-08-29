import React, { useState } from "react";
import OptionsMenu from "../helpers/options-menu";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PlanItemExercise from "../plan-item-exercise/plan-item-exercise";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { editPlanItemSlice } from "../redux/reducers/trainingPlanSlice";
import { useDispatch } from "react-redux";

export default function PlanItem(props) {
  const [isPlanItemEditMode, setPlanItemEditMode] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleRegistration = (data) => {
    setPlanItemEditMode(false);

    const payload = {
      planItemToUpdate: {
        muscleName: data.muscleName,
      },
      id: props.item.id,
    };

    console.log(payload);

    dispatch(editPlanItemSlice(payload));
  };

  const registerOptions = {
    muscleName: {
      required: "Muscle name is required",
      maxLength: {
        value: 50,
        message: "Muscle name can have a maximum 50 characters",
      },
    },
  };

  return (
    <div className="p-2 shadow mb-4 rounded-3 bg-white">
      {isPlanItemEditMode ? (
        <div>
          <form
            className="row align-items-center justify-content-between p-0 m-0 mb-1 mt-2 px-2"
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className="col-8">
              <TextField
                label="Muscle name"
                variant="standard"
                defaultValue={props.item.muscleName}
                {...register("muscleName", registerOptions.muscleName)}
              />

              <div>
                <small className="text-danger">{errors?.muscleName && errors.muscleName.message}</small>
              </div>
            </div>

            <div className="col-auto">
              <button className="confirm_form_btn">
                <CheckRoundedIcon />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="row align-items-center justify-content-between p-0 m-0 mb-3 bg-white">
          <div className="col-8 fs-2">{props.item.muscleName}</div>

          {!props.isCreationMode && (
            <div className="col-auto">
              <OptionsMenu
                isPlanItemEditMode={isPlanItemEditMode}
                setPlanItemEditMode={setPlanItemEditMode}
                planItemId={props.item.id}
              />
            </div>
          )}
        </div>
      )}

      {!props.isCreationMode ? (
        <div>
          {props.item.exercises.map((item) => {
            return <PlanItemExercise key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <div>
          {props.item.exercises.map((item, i) => {
            return <PlanItemExercise key={i} item={item} isCreationMode={props.isCreationMode} />;
          })}
        </div>
      )}
    </div>
  );
}

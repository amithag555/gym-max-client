import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import CreatePlanItemExercise from "../create-plan-item-exercise-member/create-plan-item-exercise";
import DisplayPlanItem from "../display-plan-item/display-plan-item";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlanItemToTrainingPlan,
  createNewPlanItem,
  createPlanItemSlice,
  selectCurrentPlanItem,
  selectCurrentTrainingPlan,
} from "../redux/reducers/trainingPlanSlice";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import { ROLES } from "../config";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function CreatePlanItem() {
  const [isCreated, setIsCreated] = useState(false);
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const currentTrainingPlan = useSelector(selectCurrentTrainingPlan);
  const currentPlanItem = useSelector(selectCurrentPlanItem);
  const currentUser = useSelector(selectCurrentUser);

  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle("Add Muscle"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleRegistration = (data) => {
    let payload = {};

    if (currentTrainingPlan.id) {
      payload = {
        newPlanItem: {
          muscleName: data.muscleName,
          trainingPlanId: currentTrainingPlan.id,
          exercises: [],
        },
      };
    } else {
      payload = {
        newPlanItem: {
          muscleName: data.muscleName,
          exercises: [],
        },
      };
    }

    dispatch(createNewPlanItem(payload));
    setIsCreated(true);
  };

  const registerOptions = {
    muscleName: {
      required: "Name is required",
      maxLength: {
        value: 100,
        message: "Muscle name can have a maximum 100 characters",
      },
    },
  };

  const onDoneBtnClick = (e) => {
    if (currentTrainingPlan.id) {
      dispatch(createPlanItemSlice(currentPlanItem));

      if (e.view.frames.screen.width > 500) {
        navigation(`/admin/trainingPlan/${currentTrainingPlan.id}`);
      } else {
        navigation(`/trainingPlan/${currentTrainingPlan.id}`);
      }
    } else {
      dispatch(addPlanItemToTrainingPlan());

      if (e.view.frames.screen.width > 500) {
        navigation("/admin/createTrainingPlan");
      } else {
        navigation("/createTrainingPlan");
      }
    }
  };

  return (
    <div>
      {currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.TRAINER && currentUser.role !== ROLES.MEMBER ? (
        <ValidateAuth />
      ) : (
        <div className={`${currentUser.role !== ROLES.MEMBER && "admin_background_training_plan_div"}`}>
          <div className="col-md-7 mx-md-auto">
            <div className="p-2 p-md-0">
              {!isMultipleMode ? (
                <div className="shadow rounded-3 px-3 px-md-2 py-3 bg-white">
                  <form onSubmit={handleSubmit(handleRegistration)} className="text-md-center">
                    <div className="mt-md-2">
                      <TextField
                        className="col-md-11"
                        label="Enter muscle name"
                        variant={location.pathname.includes("admin") ? "outlined" : "standard"}
                        {...register("muscleName", registerOptions.muscleName)}
                      />

                      <div>
                        <small className="text-danger">{errors?.muscleName && errors.muscleName.message}</small>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 row m-0 p-0 justify-content-end">
                      <div className="p-0 m-0 col-auto">
                        <button className="confirm_training_plan_btn">Add exercise</button>
                      </div>

                      <div className="p-0 m-0 col-auto ms-3 me-2 me-md-3">
                        <button
                          type="button"
                          className="cancel_training_plan_btn"
                          onClick={(e) => {
                            if (e.view.frames.screen.width > 500) {
                              navigation("/admin/trainingPlans");
                            } else {
                              navigation("/myTrainingPlans");
                            }
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <DisplayPlanItem isMultipleMode={isMultipleMode} />
              )}
            </div>

            {isCreated && (
              <div>
                <div className="mt-md-4">
                  <CreatePlanItemExercise setIsMultipleMode={setIsMultipleMode} styleProps="col-12" />
                </div>

                <div className="mx-auto text-center my-4 col-11 col-md-9 mt-md-5">
                  <button id="done_btn" className="confirm_training_plan_btn w-100" onClick={onDoneBtnClick}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

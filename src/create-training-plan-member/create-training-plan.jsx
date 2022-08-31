import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewTrainingPlan,
  createTrainingPlanSlice,
  selectCurrentTrainingPlan,
} from "../redux/reducers/trainingPlanSlice";
import DisplayTrainingPlan from "../display-training-plan-member/display-training-plan";
import { selectCurrentMember } from "../redux/reducers/memberSlice";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import { ROLES } from "../config";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function CreateTrainingPlan() {
  const [isDisplayMode, setIsDisplayMode] = useState(false);
  const currentTrainingPlan = useSelector(selectCurrentTrainingPlan);
  const currentMember = useSelector(selectCurrentMember);
  const currentUser = useSelector(selectCurrentUser);

  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTrainingPlan.title && currentTrainingPlan.plainItems.length > 0) {
      setIsDisplayMode(true);
    }

    dispatch(setCurrentTitle("New Training Plan"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleRegistration = (data, e) => {
    const payload = {
      newTrainingPlan: {
        title: data.trainingPlanTitle,
        trainerName: data.trainerName,
        memberId: currentMember.id || currentUser.id,
        plainItems: [],
      },
    };

    dispatch(createNewTrainingPlan(payload));

    const window = e.nativeEvent.path.find((item) => item.screen);

    if (window.screen.width > 500) {
      navigation("/admin/createPlanItem");
    } else {
      navigation("/createPlanItem");
    }
  };

  const registerOptions = {
    trainingPlanTitle: {
      required: "Name is required",
      maxLength: {
        value: 100,
        message: "Training plan name can have a maximum 100 characters",
      },
    },
    trainerName: {
      required: false,
      maxLength: {
        value: 50,
        message: "Trainer name can have a maximum 50 characters",
      },
    },
  };

  const onCreateTrainingPlanBtnClick = (e) => {
    dispatch(createTrainingPlanSlice(currentTrainingPlan));

    if (e.view.frames.screen.width > 500) {
      navigation("/admin/trainingPlans");
    } else {
      navigation("/myTrainingPlans");
    }
  };

  return (
    <div>
      {currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.TRAINER && currentUser.role !== ROLES.MEMBER ? (
        <ValidateAuth />
      ) : (
        <div className={`${currentUser.role !== ROLES.MEMBER && "admin_background_training_plan_div"}`}>
          <div className="col-md-7 mx-md-auto">
            <div>
              {!isDisplayMode ? (
                <div className="p-2 p-md-0">
                  <div className="shadow rounded-3 px-2 py-3 bg-white">
                    <form onSubmit={handleSubmit(handleRegistration)}>
                      <div className="row justify-content-center p-0 m-0 mt-md-2">
                        <div className="col-md-6">
                          <TextField
                            className="w-100"
                            label="Enter training plan name"
                            variant={location.pathname.includes("admin") ? "outlined" : "standard"}
                            {...register("trainingPlanTitle", registerOptions.trainingPlanTitle)}
                          />

                          <div>
                            <small className="text-danger">
                              {errors?.trainingPlanTitle && errors.trainingPlanTitle.message}
                            </small>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0 col-md-6">
                          <TextField
                            className="w-100"
                            label="Enter trainer name"
                            variant={location.pathname.includes("admin") ? "outlined" : "standard"}
                            {...register("trainerName", registerOptions.trainerName)}
                          />

                          <div>
                            <small className="text-danger">{errors?.trainerName && errors.trainerName.message}</small>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 mt-md-5 row m-0 p-0 justify-content-end">
                        <div className="p-0 m-0 col-auto">
                          <button className="confirm_training_plan_btn">Add muscle</button>
                        </div>

                        <div className="p-0 m-0 col-auto ms-3 me-3">
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
                </div>
              ) : (
                <div>
                  <DisplayTrainingPlan />

                  <div className="mt-2 row m-0 p-0 justify-content-center">
                    <div className="p-0 m-0 col-11 col-md-9 mb-3">
                      <button
                        className="confirm_training_plan_btn w-100"
                        onClick={(e) => {
                          if (e.view.frames.screen.width > 500) {
                            navigation("/admin/createPlanItem");
                          } else {
                            navigation("/createPlanItem");
                          }
                        }}
                      >
                        Add muscle
                      </button>
                    </div>

                    <div className="p-0 m-0 col-11 col-md-9">
                      <button
                        type="button"
                        className="create_training_plan_btn w-100"
                        onClick={onCreateTrainingPlanBtnClick}
                      >
                        Create training plan
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

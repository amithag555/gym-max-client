import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlanItem from "../plan-item/plan-item";
import {
  selectCurrentTrainingPlan,
  getTrainingPlanByIdSlice,
  selectTrainingPlanErrors,
  editTrainingPlanSlice,
} from "../redux/reducers/trainingPlanSlice";
import OptionsMenu from "../helpers/options-menu";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "./display-training-plan-member.css";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import { ROLES } from "../config";
import { selectCurrentMember } from "../redux/reducers/memberSlice";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayTrainingPlan(props) {
  const [isTrainingPlanEditMode, setTrainingPlanEditMode] = useState(false);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const currentTrainingPlan = useSelector(selectCurrentTrainingPlan);
  const trainingPlanErrors = useSelector(selectTrainingPlanErrors);
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getTrainingPlanByIdSlice(params.id));
    } else {
      setIsCreationMode(true);
    }

    if (currentUser.role === ROLES.MEMBER) {
      dispatch(setCurrentTitle("Training Plan"));
    } else {
      if (!isCreationMode) {
        if (currentMember.id) {
          dispatch(setCurrentTitle(`${currentMember.fullName}'s Training Plans`));
        } else {
          dispatch(setCurrentTitle("All Training Plans"));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isCreationMode) {
      dispatch(setCurrentTitle("New Training Plan"));
    }
  }, [isCreationMode]);

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
    setTrainingPlanEditMode(false);

    const payload = {
      trainingPlanToUpdate: {
        title: data.trainingPlanTitle,
      },
      id: currentTrainingPlan.id,
    };

    dispatch(editTrainingPlanSlice(payload));
  };

  const registerOptions = {
    trainingPlanTitle: {
      required: "Name is required",
      maxLength: {
        value: 100,
        message: "Training plan name can have a maximum 100 characters",
      },
    },
  };

  return (
    <div>
      {currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.TRAINER && currentUser.role !== ROLES.MEMBER ? (
        <ValidateAuth />
      ) : (
        <div className={`${currentUser.role !== ROLES.MEMBER && "admin_background_training_plan_div"}`}>
          <div className={`${!isCreationMode && "col-md-7 mx-md-auto"}`}>
            {isTrainingPlanEditMode ? (
              <div className="p-2 p-md-0 mb-md-3">
                <form
                  className="row align-items-center justify-content-between p-0 m-0 mb-1 mt-2 p-2 bg-white shadow rounded-3"
                  onSubmit={handleSubmit(handleRegistration)}
                >
                  <div className="col-8">
                    <TextField
                      label="Training plan name"
                      variant="standard"
                      defaultValue={currentTrainingPlan?.title}
                      {...register("trainingPlanTitle", registerOptions.trainingPlanTitle)}
                    />

                    <div>
                      <small className="text-danger">{errors?.trainingPlanTitle && errors.trainingPlanTitle.message}</small>
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
              <div className="p-2 p-md-0 mb-md-3">
                <div className="row align-items-center justify-content-between p-0 m-0 p-2 bg-white rounded-3 shadow">
                  <h2 className="text-center col-8 m-0 p-0 py-2">{currentTrainingPlan?.title}</h2>

                  {!isCreationMode && (
                    <div className="col-auto">
                      <OptionsMenu
                        setTrainingPlanEditMode={setTrainingPlanEditMode}
                        isTrainingPlanEditMode={isTrainingPlanEditMode}
                        trainingPlanId={currentTrainingPlan.id}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isCreationMode ? (
              <div className="p-2 p-md-0">
                {currentTrainingPlan?.plainItems?.map((item) => {
                  return <PlanItem item={item} key={item.id} />;
                })}
              </div>
            ) : (
              <div className="p-2 p-md-0">
                {currentTrainingPlan?.plainItems?.map((item, i) => {
                  return <PlanItem item={item} key={i} isCreationMode={isCreationMode} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

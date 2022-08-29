import React, { useEffect } from "react";
import "./display-all-member-training-plans.css";
import { Link } from "react-router-dom";
import {
  deleteCurrentTrainingPlan,
  getAllTrainingPlansByMemberIdSlice,
  selectAllMemberTrainingPlans,
  selectCurrentTrainingPlan,
} from "../redux/reducers/trainingPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import { ROLES } from "../config";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayAllMemberTrainingPlans() {
  const memberTrainingPlans = useSelector(selectAllMemberTrainingPlans);
  const currentTrainingPlan = useSelector(selectCurrentTrainingPlan);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (memberTrainingPlans.length < 1) {
      dispatch(getAllTrainingPlansByMemberIdSlice(currentUser.id));
    }

    if (currentTrainingPlan.title) {
      dispatch(deleteCurrentTrainingPlan());
    }

    dispatch(setCurrentTitle("My Training Plans"));
  }, []);

  return (
    <div>
      {currentUser.role !== ROLES.MEMBER ? (
        <ValidateAuth />
      ) : (
        <div>
          <div className="mt-4 mb-3 text-center">
            <Link to={`/createTrainingPlan`} className="add_btn px-2 py-3 rounded-3">
              <AddIcon />
              Add training plan
            </Link>
          </div>

          <div className="row m-0 p-0 p-3 justify-content-center">
            {memberTrainingPlans?.map((item) => {
              return (
                <Link key={item.id} to={`/trainingPlan/${item.id}`} className="training_plan_list_link shadow p-3 mb-3">
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

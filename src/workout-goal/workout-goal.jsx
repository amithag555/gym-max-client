import "./workout-goal.css";
import { GiMuscleUp } from "react-icons/gi";
import WorkoutGoalGraph from "../graphs/workout-goal-graph";
import { selectCurrentWorkoutGoal } from "../redux/reducers/workoutGoalSlice";
import { useSelector } from "react-redux";
import WorkoutGoalForm from "../workout-goal-form/workout-goal-form";
import { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DisplayAlert from "../helpers/display-alert";

export default function WorkoutGoal() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [isWorkoutGoalDeleteMode, setIsWorkoutGoalDeleteMode] = useState(false);
  const currentWorkoutGoal = useSelector(selectCurrentWorkoutGoal);

  return (
    <div className="mt-4 px-4">
      {currentWorkoutGoal.id ? (
        <div className="col-11 mx-auto border_radius border-dark bg-white px-3 py-2 shadow">
          <div className="border_radius py-2">
            <div className="row p-0 m-0 mb-3 align-items-center">
              <h6 className="text-center m-0 p-0" style={{ width: "76%" }}>
                Monthly Workout Goal
              </h6>

              <div
                className="text-center p-0"
                style={{ width: "12%" }}
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                <EditRoundedIcon className="font_color_blue" />
              </div>

              <div
                className="text-center col-1 p-0"
                onClick={() => {
                  setIsWorkoutGoalDeleteMode(true);
                }}
              >
                <DeleteRoundedIcon className="text-danger" />
              </div>

              <DisplayAlert
                title="Delete"
                contentText="Are you sure you want to delete this item?"
                isTowButtons={true}
                isWorkoutGoalDeleteMode={isWorkoutGoalDeleteMode}
                setIsWorkoutGoalDeleteMode={setIsWorkoutGoalDeleteMode}
              />
            </div>

            <h6 className="header_font_size p-0 m-0">
              Your monthly workout goal is {currentWorkoutGoal.trainingNumber} training
            </h6>

            <div className="mt-3 mb-3">
              <WorkoutGoalGraph />
            </div>

            <h6 className="header_font_size p-0 m-0">
              You have {currentWorkoutGoal.trainingNumber - currentWorkoutGoal.currentTrainingNumber} more training left
            </h6>
          </div>
        </div>
      ) : (
        <div className="col-10 border_radius row p-0 m-0 px-2 py-1 align-items-center justify-content-start mx-auto border-dark bg-white shadow">
          <div
            className="border_radius border-warning row p-0 m-0 align-items-center justify-content-center"
            style={{ height: "90px", width: "72px" }}
          >
            <div className="icon_div">
              <GiMuscleUp className="icon" />
            </div>
          </div>

          <div className="border_radius col-8">
            <h6 className="add_goal_header text-start m-0">Monthly Workout Goal</h6>
            <button
              className="add_goal_btn mt-3"
              onClick={() => {
                setIsCreationMode(true);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <WorkoutGoalForm
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        isCreationMode={isCreationMode}
        setIsCreationMode={setIsCreationMode}
      />
    </div>
  );
}

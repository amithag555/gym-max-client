import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkoutGoalStatisticsGraph from "../graphs/workout-goal-statistics-graph";
import DialogDatePicker from "../helpers/dialog-date-picker";
import { setCurrentTitle } from "../redux/reducers/generalSlice";
import { getMemberWorkoutGoalsByYearSlice, selectMemberWorkoutGoals } from "../redux/reducers/workoutGoalSlice";

export default function DisplayWorkoutGoalStatistics() {
  const memberWorkoutGoals = useSelector(selectMemberWorkoutGoals);

  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();

  useEffect(() => {
    if (memberWorkoutGoals.length < 1) {
      dispatch(getMemberWorkoutGoalsByYearSlice(currentYear));
    }

    dispatch(setCurrentTitle("Workout Goal Statistics"));
  }, []);

  return (
    <div>
      <div className="py-2 px-3">
        <div className="border_radius py-2 bg-white">
          <div className="text-center mb-4">
            <DialogDatePicker isOnlyYear={true} />
          </div>

          <div>
            <WorkoutGoalStatisticsGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "../canvasjs.react";
import { selectMemberWorkoutGoals } from "../redux/reducers/workoutGoalSlice";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function WorkoutGoalStatisticsGraph() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [workoutGoals, setWorkoutGoals] = useState([]);
  const memberWorkoutGoals = useSelector(selectMemberWorkoutGoals);

  useEffect(() => {
    setDataPoints();
  }, [memberWorkoutGoals]);

  const setDataPoints = () => {
    let tempCompletionPercentages = 0;

    const tempWorkoutGoals = memberWorkoutGoals.map((item) => {
      tempCompletionPercentages = (item.currentTrainingNumber * 100) / item.trainingNumber;
      tempCompletionPercentages = Math.floor(tempCompletionPercentages);

      return {
        label: months[new Date(item.date).getMonth()],
        y: tempCompletionPercentages,
      };
    });

    console.log(tempWorkoutGoals);
    setWorkoutGoals(tempWorkoutGoals);
  };

  const options = {
    theme: "light2",

    axisY: {
      title: "Completion percentages",
      prefix: "%",
    },

    data: [
      {
        type: "column",
        dataPoints: workoutGoals,
      },
    ],
  };

  return (
    <div>
      {memberWorkoutGoals?.length < 1 ? (
        <div className="text-center pb-3">
          <h6 className="m-0">Not found results for the selected year</h6>
        </div>
      ) : (
        <div>
          <div className="text-center">
            <div>
              <h6 className="m-0 mb-2">Workout goal distribution by month per year</h6>
            </div>
          </div>

          <div className="border_radius py-4 px-3 bg-white">
            <CanvasJSChart options={options} containerProps={{ width: "100%", height: "350px" }} />
          </div>
        </div>
      )}
    </div>
  );
}

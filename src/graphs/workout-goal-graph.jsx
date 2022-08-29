import React, { useState } from "react";
import { useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";
import { selectCurrentWorkoutGoal } from "../redux/reducers/workoutGoalSlice";
import { useSelector } from "react-redux";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function WorkoutGoalGraph(props) {
  const currentWorkoutGoal = useSelector(selectCurrentWorkoutGoal);
  const [donePercent, setDonePercent] = useState(0);

  useEffect(() => {
    let tempDonePercent = (currentWorkoutGoal.currentTrainingNumber * 100) / currentWorkoutGoal.trainingNumber;

    tempDonePercent = Math.floor(tempDonePercent);
    setDonePercent(tempDonePercent);
  }, [currentWorkoutGoal]);

  const options = {
    theme: "light1",
    animationEnabled: true,

    subtitles: [
      {
        text: `${donePercent}% Done`,
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        type: "doughnut",
        showInLegend: true,
        dataPoints: [
          { name: "Done", y: donePercent },
          { name: "Remaining", y: 100 - donePercent },
        ],
      },
    ],
  };

  return (
    <div className="">
      <CanvasJSChart containerProps={{ width: "95%", height: "230px" }} options={options} />
    </div>
  );
}

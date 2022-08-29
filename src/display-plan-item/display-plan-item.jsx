import React from "react";
import { useSelector } from "react-redux";
import PlanItemExercise from "../plan-item-exercise/plan-item-exercise";
import { selectCurrentPlanItem } from "../redux/reducers/trainingPlanSlice";

export default function DisplayPlanItem(props) {
  const currentPlanItem = useSelector(selectCurrentPlanItem);

  return (
    <div className="p-2 shadow mb-4 rounded-3 bg-white">
      <div className="row align-items-center justify-content-between p-0 m-0 mb-3">
        <div className="col-8 fs-2">{currentPlanItem?.muscleName}</div>
      </div>

      {currentPlanItem?.exercises.map((item, i) => {
        return <PlanItemExercise key={i} item={item} isMultipleMode={props.isMultipleMode} />;
      })}
    </div>
  );
}

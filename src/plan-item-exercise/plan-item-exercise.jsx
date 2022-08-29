import React, { useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import OptionsMenu from "../helpers/options-menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import BikeScooterRoundedIcon from "@mui/icons-material/BikeScooterRounded";
import EditPlanItemExerciseForm from "../edit-plan-item-exercise-form/edit-plan-item-exercise-form";
import "./plan-item-exercise.css";
import { Tooltip } from "@mui/material";

export default function PlanItemExercise(props) {
  const [isExerciseEditMode, setExerciseEditMode] = useState(false);

  return (
    <div>
      {isExerciseEditMode ? (
        <EditPlanItemExerciseForm setExerciseEditMode={setExerciseEditMode} item={props.item} />
      ) : (
        <div className="mt-3 shadow rounded-3 bg-white">
          <div className="row align-items-center justify-content-between p-0 m-0 py-2 mb-1">
            <div className="col-8">{props.item.title}</div>

            {!props.isCreationMode && !props.isMultipleMode && (
              <div className="col-auto">
                <OptionsMenu
                  isExerciseEditMode={isExerciseEditMode}
                  setExerciseEditMode={setExerciseEditMode}
                  exerciseId={props.item.id}
                />
              </div>
            )}
          </div>

          <div className="row justify-content-between p-0 m-0 p-2 bg-white rounded-3">
            <div className="exercise_div col-2 text-center">
              <div className="p-1">
                <Tooltip title="Sets number" enterTouchDelay={0}>
                  <SportsMartialArtsIcon />
                </Tooltip>
              </div>

              <div>{props.item.setsNumber}</div>
            </div>

            <div className="exercise_div col-2 text-center">
              <div className="p-1">
                <Tooltip title="Repetitions number" enterTouchDelay={0}>
                  <RefreshIcon />
                </Tooltip>
              </div>

              <div>{props.item.repetitionsNumber}</div>
            </div>

            <div className="exercise_div col-2 text-center">
              <div className="p-1">
                <Tooltip title="Weight" enterTouchDelay={0}>
                  <FitnessCenterIcon />
                </Tooltip>
              </div>

              <div>{props.item.weight}</div>
            </div>

            <div className="exercise_div col-2 text-center">
              <div className="p-1">
                <Tooltip title="Machine number" enterTouchDelay={0}>
                  <BikeScooterRoundedIcon />
                </Tooltip>
              </div>
              {props.item.machineNumber ? <div>{props.item.machineNumber}</div> : <div>-</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../config";
import ValidateAuth from "../helpers/validate-auth";
import DialogDatePicker from "../helpers/dialog-date-picker";
import LoadStatisticsGraph from "../graphs/load-statistics-graph";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayLoadStatisticsGraphAdmin() {
  const currentUser = useSelector(selectCurrentUser);
  const [currentDate, setCurrentDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 1}`
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle("Load Statistics"));
  }, []);

  return (
    <div>
      {currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.RECEPTION && currentUser.role !== ROLES.TRAINER ? (
        <ValidateAuth />
      ) : (
        <div className="card border_radius bg-whit border-0 mx-auto light_grey_background_color">
          <div className="border_radius_top card-header bg-whit light_grey_background_color p-3">
            <div className="row justify-content-end m-0 p-0">
              <div className="m-0 p-0 col-auto mx-3">
                <DialogDatePicker isOnlyYear={false} setCurrentDate={setCurrentDate} />
              </div>
            </div>
          </div>

          <div className="p-3 mt-4">
            <LoadStatisticsGraph currentDate={currentDate} height="500px" />
          </div>
        </div>
      )}
    </div>
  );
}

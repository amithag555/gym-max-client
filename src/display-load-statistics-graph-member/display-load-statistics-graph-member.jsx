import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadStatisticsGraph from "../graphs/load-statistics-graph";
import DialogDatePicker from "../helpers/dialog-date-picker";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayLoadStatisticsGraphMember() {
  const [currentDate, setCurrentDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 1}`
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle("Load Statistics"));
  }, []);

  return (
    <div>
      <div>
        <div className="py-2 px-3">
          <div className="border_radius py-2 bg-white">
            <div className="text-center mb-4">
              <DialogDatePicker isOnlyYear={false} setCurrentDate={setCurrentDate} />
            </div>

            <div>
              <LoadStatisticsGraph currentDate={currentDate} isSmartPhoneMode={true} height="350px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

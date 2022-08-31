import React, { useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";
import { getWorkDayActivityByDateService } from "../services/work-day-activity.service";
import { useState } from "react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LoadStatisticsGraph(props) {
  const [workDayActivityCount, setWorkDayActivityCount] = useState(0);
  const [activitiesPerHour, setActivitiesPerHour] = useState([]);
  const [isNotExist, setIsNotExist] = useState(false);

  const dateOfToday = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

  useEffect(() => {
    if (props.currentDate === dateOfToday) {
      setIsNotExist(true);
    } else {
      getWorkDayActivityByDate(props.currentDate);
    }
  }, [props.currentDate]);

  const getWorkDayActivityByDate = async (_date) => {
    try {
      const response = await getWorkDayActivityByDateService(_date);

      if (!response) {
        return setIsNotExist(true);
      }

      setIsNotExist(false);

      let tempActivitiesPerHour = [];

      tempActivitiesPerHour = response.activityPerHour.map((item) => {
        return { label: `${new Date(item.hour).getUTCHours().toString()}:00`, y: item.count };
      });

      setActivitiesPerHour(tempActivitiesPerHour);
      setWorkDayActivityCount(response.count);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const options = {
    theme: "light2",

    axisY: {
      title: "Number of trainees",
    },

    data: [
      {
        type: "splineArea",
        dataPoints: activitiesPerHour,
      },
    ],
  };

  return (
    <div>
      {isNotExist ? (
        <div className="text-center pb-3">
          {props.isSmartPhoneMode ? (
            <h6 className="m-0">Not found results for the selected date</h6>
          ) : (
            <h4 className="m-0">Not found results for the selected date</h4>
          )}
        </div>
      ) : (
        <div>
          <div className="text-center">
            {props.isSmartPhoneMode ? (
              <div>
                <h6 className="m-0 mb-2">Load distribution by a total entrance per day</h6>
                <h6 className="m-0">{`Total entrance: ${workDayActivityCount}`}</h6>
              </div>
            ) : (
              <div>
                <h4 className="m-0 mb-2">Load distribution by a total entrance per day</h4>
                <h4 className="m-0">{`Total entrance: ${workDayActivityCount}`}</h4>
              </div>
            )}
          </div>

          <div className="border_radius py-4 py-md-5 px-3 bg-white mt-3">
            <CanvasJSChart options={options} containerProps={{ width: "100%", height: props.height }} />
          </div>
        </div>
      )}
    </div>
  );
}

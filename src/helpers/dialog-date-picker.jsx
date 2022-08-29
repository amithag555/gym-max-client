import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { getMemberWorkoutGoalsByYearSlice } from "../redux/reducers/workoutGoalSlice";
import { useDispatch } from "react-redux";
// import { alpha } from "@material-ui/core/styles";

export default function DialogDatePicker(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
  );

  const [selectedYear, setSelectedYear] = React.useState(new Date());

  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const tempDate = new Date(date);
    let formatDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;

    props.setCurrentDate(formatDate);
  };

  const handleYearChange = (date) => {
    setSelectedYear(date);

    const year = new Date(date).getFullYear();
    dispatch(getMemberWorkoutGoalsByYearSlice(year));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {props.isOnlyYear ? (
        <KeyboardDatePicker
          views={["year"]}
          margin="normal"
          id="date-picker-dialog"
          label="Select year"
          format="yyyy"
          value={selectedYear}
          onChange={handleYearChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      ) : (
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Select date"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      )}
    </MuiPickersUtilsProvider>
  );
}

import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./display-classes-schedule-admin.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { getAllGymClassesService } from "../services/gym-class.service";
import GymClassForm from "../gym-class-form/gym-class-form";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { ROLES } from "../config";
import ValidateAuth from "../helpers/validate-auth";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayClassesScheduleAdmin() {
  const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [gymClasses, setGymClasses] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [gymClassToEdit, setGymClassToEdit] = useState({});
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle("Classes Schedule"));
  }, []);

  useEffect(() => {
    getAllGymClasses();
    setIsChanged(false);
  }, [isChanged]);

  const getAllGymClasses = async () => {
    let gymClassesArr = [[], [], [], [], [], [], []];

    try {
      const response = await getAllGymClassesService();

      for (let index = 0; index < response.length; index++) {
        switch (response[index].day) {
          case "SUNDAY":
            gymClassesArr[0].push(response[index]);
            break;

          case "MONDAY":
            gymClassesArr[1].push(response[index]);
            break;

          case "TUESDAY":
            gymClassesArr[2].push(response[index]);
            break;

          case "WEDNESDAY":
            gymClassesArr[3].push(response[index]);
            break;

          case "THURSDAY":
            gymClassesArr[4].push(response[index]);
            break;

          case "FRIDAY":
            gymClassesArr[5].push(response[index]);
            break;

          case "SATURDAY":
            gymClassesArr[6].push(response[index]);
            break;

          default:
            break;
        }
      }

      setGymClasses(gymClassesArr);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      {currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.RECEPTION && currentUser.role !== ROLES.TRAINER ? (
        <ValidateAuth />
      ) : (
        <div className="card border_radius light_grey_background_color border-0">
          <div className="border_radius_top card-header p-3 light_grey_background_color">
            <div className="row justify-content-end m-0 p-0">
              <div className="m-0 p-0 col-auto mx-3">
                {currentUser.role === ROLES.ADMIN && (
                  <button
                    className="add_btn py-3 px-4 rounded-3 border-0"
                    onClick={() => {
                      setIsCreationMode(true);
                    }}
                  >
                    <AddIcon />
                    Create class
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="row m-0 p-0 p-3 justify-content-between">
            {daysArr.map((item) => {
              return (
                <div className="day_div rounded-3 shadow py-2" key={item}>
                  {item}
                </div>
              );
            })}
          </div>

          <div className="p-0 m-0 p-3 row justify-content-between">
            {gymClasses.map((item, i) => {
              return (
                <div className="col_class_div p-0 m-0" key={i}>
                  {item.map((item) => {
                    return (
                      <div className="class_div rounded-3 mb-4 shadow" key={item.id}>
                        <div className="row p-0 m-0 mb-1 align-items-center justify-content-between">
                          <h6 className="col-9 fw-bold p-0 m-0">{item.type}</h6>
                          {(currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.RECEPTION) && (
                            <div className="col-3 p-0 m-0">
                              <button
                                className="edit_btn"
                                onClick={() => {
                                  setGymClassToEdit(item);
                                  setIsEditMode(true);
                                }}
                              >
                                <EditRoundedIcon />
                              </button>
                            </div>
                          )}
                        </div>
                        <span className="time_span">
                          {new Date(item.startHour).getUTCHours()}:
                          {new Date(item.startHour).getUTCMinutes() < 10
                            ? `0${new Date(item.startHour).getUTCMinutes()}`
                            : new Date(item.startHour).getUTCMinutes()}
                        </span>{" "}
                        | <span className="time_span">{item.duration} Min</span>
                        <div>Trainer: {item.trainer}</div>
                        <div>Studio: {item.roomNumber}</div>
                        <div>Available places: {item.maxMembers - item.members.length}</div>
                        {item.isActive ? (
                          <div className="badge bg-success mt-2">Active</div>
                        ) : (
                          <div className="badge bg-danger mt-2">Inactive</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <GymClassForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            gymClassToEdit={gymClassToEdit}
            setIsChanged={setIsChanged}
            isCreationMode={isCreationMode}
            setIsCreationMode={setIsCreationMode}
          />
        </div>
      )}
    </div>
  );
}

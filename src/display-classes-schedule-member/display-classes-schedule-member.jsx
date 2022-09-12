import React, { useState } from "react";
import "./display-classes-schedule-member.css";
import {
  getGymClassesByDayService,
  addMemberToGymClassService,
  removeMemberFromGymClassService,
} from "../services/gym-class.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { ROLES } from "../config";
import ValidateAuth from "../helpers/validate-auth";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

let index = 0;
let previousClickedBtnTarget = {};

export default function DisplayClassesScheduleMember() {
  const [gymClasses, setGymClasses] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  const typeArr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const daysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const longDaysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dispatch = useDispatch();

  useEffect(() => {
    getGymClassesByDay("SUNDAY");

    previousClickedBtnTarget = document.getElementById("0");
    previousClickedBtnTarget.className = "clicked_day_btn";

    dispatch(setCurrentTitle("Classes Schedule"));
  }, []);

  const getGymClassesByDay = async (_gymClassDay) => {
    try {
      const response = await getGymClassesByDayService(_gymClassDay);

      setGymClasses(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeMemberFromGymClass = async (_gymClassId, _memberId) => {
    try {
      const response = await removeMemberFromGymClassService(_gymClassId, _memberId);

      if (response.id) {
        let tempGymClasses = [];

        tempGymClasses = gymClasses.map((item) => (item.id === response.id ? response : item));

        setGymClasses(tempGymClasses);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addMemberToGymClass = async (_gymClassId, _memberId) => {
    try {
      const response = await addMemberToGymClassService(_gymClassId, _memberId);

      if (response.id) {
        let tempGymClasses = [];

        tempGymClasses = gymClasses.map((item) => (item.id === response.id ? response : item));

        setGymClasses(tempGymClasses);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDayBtnClick = (e) => {
    e.target.className = "clicked_day_btn";

    if (e.target !== previousClickedBtnTarget) {
      previousClickedBtnTarget.className = "day_btn";
      previousClickedBtnTarget = e.target;

      getGymClassesByDay(typeArr[e.target.id]);
      index = e.target.id;
    }
  };

  const onSignUpBtnClick = (e) => {
    addMemberToGymClass(e.target.id, currentUser.id);
  };

  const onCancelBtnClick = (e) => {
    removeMemberFromGymClass(e.target.id, currentUser.id);
  };

  return (
    <div>
      {currentUser.role !== ROLES.MEMBER ? (
        <ValidateAuth />
      ) : (
        <div>
          <div className=" border-dark px-3 mt-3">
            <div className="main_list_div bg-white pb-2 pt-3 px-2">
              <div className="row p-0 m-0 justify-content-between">
                {daysArr.map((item, i) => {
                  return (
                    <button id={i} className="day_btn" key={item} onClick={onDayBtnClick}>
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="py-2">
                {gymClasses?.map((item, i) => {
                  return (
                    <div key={item.id}>
                      <div className="row list_item_row p-0 m-0 px-2 mt-3 align-items-center justify-content-between text-center">
                        <div className="time_item_div">
                          <div>
                            {new Date(item.startHour).getUTCHours()}:
                            {new Date(item.startHour).getUTCMinutes() < 10
                              ? `0${new Date(item.startHour).getUTCMinutes()}`
                              : new Date(item.startHour).getUTCMinutes()}
                          </div>

                          {longDaysArr[index]}
                        </div>
                        <div className="details_item_div">
                          <h6>{item.type}</h6>
                          <div>
                            {item.trainer} | studio {item.roomNumber} | {item.duration} Min
                          </div>
                          <div>Available places: {item.maxMembers - item.members.length}</div>
                        </div>

                        {item?.members?.findIndex((item) => item.id === currentUser.id) === -1 ? (
                          item.members.length === item.maxMembers ? (
                            <div className="full_item_div" style={{ width: "16%" }}>
                              Full
                            </div>
                          ) : (
                            <div className="p-0" style={{ width: "16%" }}>
                              <button id={item.id} className="sign_up_item_btn" onClick={onSignUpBtnClick}>
                                Sign up
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="p-0" style={{ width: "16%" }}>
                            <button id={item.id} className="cancel_item_btn" onClick={onCancelBtnClick}>
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {i !== gymClasses.length - 1 && <hr />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

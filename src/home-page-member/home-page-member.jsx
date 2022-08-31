import WorkoutGoal from "../workout-goal/workout-goal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentWorkoutGoal,
  updateCurrentTrainingNumberByWorkoutGoalIdSlice,
  getCurrentMemberWorkoutGoalSlice,
} from "../redux/reducers/workoutGoalSlice";
import { useEffect, useState } from "react";
import LiveLoadStatus from "../live-load-status/live-load-status";
import "./home-page-member.css";
import { decrementClubCountByIdService, incrementClubCountByIdService } from "../services/club.service";
import { selectCurrentUser, updateCurrentUser } from "../redux/reducers/authSlice";
import { changeIsEntrySlice, selectCurrentMember } from "../redux/reducers/memberSlice";
import { io } from "socket.io-client";
import DisplayAlert from "../helpers/display-alert";

const socket = io("http://localhost:3000");

export default function HomePageMember() {
  const currentWorkoutGoal = useSelector(selectCurrentWorkoutGoal);
  const [isEntry, setIsEntry] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentMemberWorkoutGoalSlice());

    if (currentUser.isFirstLogin) {
      setIsFirstLogin(true);
    }
  }, []);

  useEffect(() => {
    socket.on("connect", (msg) => {
      console.log("connect");
    });

    socket.on("adminConfirmClient", (_data) => {
      if (_data === socket.id) {
        console.log(_data);
        setIsEntry(true);
      }
    });

    socket.on("adminUnconfirmedClient", (_data) => {
      if (_data === socket.id) {
        console.log(_data);
        setIsDisabled(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isEntry) {
      onAdminConfirmEvent();
      setIsDisabled(false);
      setIsEntry(false);
    }
  }, [isEntry]);

  useEffect(() => {
    if (currentMember.id) {
      dispatch(updateCurrentUser(currentMember));
    }
  }, [currentMember]);

  const decrementClubCountById = async (_clubId) => {
    try {
      await decrementClubCountByIdService(_clubId);
    } catch (error) {
      console.error(error.message);
    }
  };

  const incrementClubCountById = async (_clubId) => {
    try {
      await incrementClubCountByIdService(_clubId);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onEntryClickBtn = () => {
    socket.emit("memberEntryServer", socket.id, currentUser.id);
    setIsDisabled(true);
  };

  const onAdminConfirmEvent = () => {
    if (currentWorkoutGoal.id && currentWorkoutGoal.currentTrainingNumber < currentWorkoutGoal.trainingNumber) {
      dispatch(updateCurrentTrainingNumberByWorkoutGoalIdSlice(currentWorkoutGoal.id));
    }

    dispatch(changeIsEntrySlice());
    incrementClubCountById(1);
  };

  const onExitClickBtn = () => {
    dispatch(changeIsEntrySlice());
    decrementClubCountById(1);
  };

  return (
    <div>
      <LiveLoadStatus />

      <div className="col-6 mx-auto mt-4 text-center">
        {currentUser.isEntry ? (
          <button onClick={onExitClickBtn} className="entry_btn bg-danger shadow">
            EXIT
          </button>
        ) : (
          <button
            id="entry_btn"
            onClick={onEntryClickBtn}
            className={`entry_btn bg-success shadow ${isDisabled && "disabled_btn"}`}
            disabled={isDisabled}
          >
            ENTRY
          </button>
        )}
      </div>

      <WorkoutGoal />

      <DisplayAlert
        title="Update password"
        contentText="Change your password to a strong password that you're not using elsewhere"
        isTowButtons={false}
        isFirstLogin={isFirstLogin}
        setIsFirstLogin={setIsFirstLogin}
      />
    </div>
  );
}

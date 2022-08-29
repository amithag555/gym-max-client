import TextField from "@mui/material/TextField";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import RefreshIcon from "@mui/icons-material/Refresh";
import BikeScooterRoundedIcon from "@mui/icons-material/BikeScooterRounded";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewExercise,
  selectCurrentTrainingPlan,
  selectCurrentPlanItem,
  createExerciseSlice,
} from "../redux/reducers/trainingPlanSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import { ROLES } from "../config";
import { useEffect } from "react";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function CreatePlanItemExercise(props) {
  const currentTrainingPlan = useSelector(selectCurrentTrainingPlan);
  const currentPlanItem = useSelector(selectCurrentPlanItem);
  const currentUser = useSelector(selectCurrentUser);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(setCurrentTitle("Add Exercise"));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      setsNumber: "",
      repetitionsNumber: "",
      machineNumber: "",
      weight: "",
    },
  });

  const handleRegistration = (data, e) => {
    let payload = {};

    if (currentPlanItem.id) {
      payload = {
        newExercise: {
          title: data.title,
          setsNumber: Number(data.setsNumber),
          repetitionsNumber: Number(data.repetitionsNumber),
          machineNumber: data.machineNumber,
          weight: Number(data.weight),
          plainItemId: currentPlanItem.id,
        },
      };

      dispatch(createExerciseSlice(payload));

      const window = e.nativeEvent.path.find((item) => item.screen);

      if (window.screen.width > 500) {
        navigation(`/admin/trainingPlan/${currentTrainingPlan.id}`);
      } else {
        navigation(`/trainingPlan/${currentTrainingPlan.id}`);
      }
    } else {
      payload = {
        newExercise: {
          title: data.title,
          setsNumber: Number(data.setsNumber),
          repetitionsNumber: Number(data.repetitionsNumber),
          machineNumber: data.machineNumber,
          weight: Number(data.weight),
        },
      };

      props.setIsMultipleMode(true);
      dispatch(createNewExercise(payload));
      reset();
    }
  };

  const registerOptions = {
    title: {
      required: "Title is required",
      maxLength: {
        value: 50,
        message: "Title can have a maximum 50 characters",
      },
    },
    setsNumber: {
      required: true,
    },
    repetitionsNumber: {
      required: true,
    },
    weight: {
      required: false,
    },
    machineNumber: {
      required: false,
    },
  };

  return (
    <div>
      {currentUser.role !== ROLES.ADMIN && currentUser.role !== ROLES.TRAINER && currentUser.role !== ROLES.MEMBER ? (
        <ValidateAuth />
      ) : (
        <div
          className={`${
            currentUser.role !== ROLES.MEMBER && currentTrainingPlan.id && "admin_background_training_plan_div"
          }`}
        >
          <div className={props.styleProps || "col-md-7 mx-auto"}>
            <div className="p-2 p-md-0">
              <form
                className="shadow rounded-3 px-3 px-md-2 py-3 bg-white text-md-center"
                onSubmit={handleSubmit(handleRegistration)}
              >
                <div className="mt-md-2">
                  <TextField
                    className="col-md-11"
                    label="Enter exercise title"
                    variant={location.pathname.includes("admin") ? "outlined" : "standard"}
                    type="text"
                    {...register("title", registerOptions.title)}
                  />

                  <div>
                    <small className="text-danger">{errors?.title && errors.title.message}</small>
                  </div>
                </div>

                <div className="row justify-content-between p-0 m-0 p-2 px-md-4 mt-4">
                  <div className="col-2 border text-center rounded-3">
                    <div className="p-1">
                      <SportsMartialArtsIcon />
                    </div>

                    <div>
                      <Tooltip title="Sets number" enterTouchDelay={0}>
                        <TextField
                          variant="standard"
                          type="number"
                          {...register("setsNumber", registerOptions.setsNumber)}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <div className="col-2 border text-center rounded-3">
                    <div className="p-1">
                      <RefreshIcon />
                    </div>

                    <div>
                      <Tooltip title="Repetitions number" enterTouchDelay={0}>
                        <TextField
                          variant="standard"
                          type="number"
                          {...register("repetitionsNumber", registerOptions.repetitionsNumber)}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <div className="col-2 border text-center rounded-3">
                    <div className="p-1">
                      <FitnessCenterIcon />
                    </div>

                    <div>
                      <Tooltip title="Weight" enterTouchDelay={0}>
                        <TextField variant="standard" type="number" {...register("weight", registerOptions.weight)} />
                      </Tooltip>
                    </div>
                  </div>

                  <div className="col-2 border text-center rounded-3">
                    <div className="p-1">
                      <BikeScooterRoundedIcon />
                    </div>

                    <div>
                      <Tooltip title="Machine number" enterTouchDelay={0}>
                        <TextField
                          variant="standard"
                          type="text"
                          {...register("machineNumber", registerOptions.machineNumber)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className="mt-4 mt-md-5 row m-0 p-0 justify-content-end">
                  <div className="p-0 m-0 col-auto me-2 me-md-3">
                    <button className="confirm_training_plan_btn">Add</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

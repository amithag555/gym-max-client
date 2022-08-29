import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  defineCurrentPlanItem,
  deletePlanItemExerciseSlice,
  deletePlanItemSlice,
  deleteTrainingPlanSlice,
} from "../redux/reducers/trainingPlanSlice";
import { useNavigate } from "react-router-dom";
import DisplayAlert from "./display-alert";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { ROLES } from "../config";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function OptionsMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isRemoveClick, setIsRemoveClick] = React.useState(false);
  const [isRemoveConfirmation, setIsRemoveConfirmation] = React.useState(false);
  const [removeEventObj, setRemoveEventObj] = React.useState({});
  const currentUser = useSelector(selectCurrentUser);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    handleRemoveEvent(removeEventObj);
  }, [isRemoveConfirmation]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddClose = (e) => {
    setAnchorEl(null);

    if (props.planItemId) {
      dispatch(defineCurrentPlanItem(props.planItemId));

      if (e.view.frames.screen.width > 500) {
        navigation("/admin/createExercise");
      } else {
        navigation("/createExercise");
      }
    } else if (props.trainingPlanId) {
      if (e.view.frames.screen.width > 500) {
        navigation("/admin/createPlanItem");
      } else {
        navigation("/createPlanItem");
      }
    }
  };

  const handleRemoveEvent = (e) => {
    if (isRemoveConfirmation) {
      if (props.planItemId) {
        dispatch(deletePlanItemSlice(props.planItemId));
      } else if (props.exerciseId) {
        dispatch(deletePlanItemExerciseSlice(props.exerciseId));
      } else if (props.trainingPlanId) {
        dispatch(deleteTrainingPlanSlice(props.trainingPlanId));

        if (e.view.frames.screen.width > 500) {
          navigation("/admin/trainingPlans");
        } else {
          navigation("/myTrainingPlans");
        }
      }
    }
  };

  const handleRemoveClose = (e) => {
    setAnchorEl(null);
    setIsRemoveClick(true);
    setRemoveEventObj(e);
  };

  const handleEditClose = () => {
    setAnchorEl(null);

    if (!props.isPlanItemEditMode && props.isPlanItemEditMode !== undefined) {
      props.setPlanItemEditMode(true);
    } else if (!props.isExerciseEditMode && props.isExerciseEditMode !== undefined) {
      props.setExerciseEditMode(true);
    } else if (!props.isTrainingPlanEditMode && props.isTrainingPlanEditMode !== undefined) {
      props.setTrainingPlanEditMode(true);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: "#ebedf4" }}
      >
        <MoreVertRoundedIcon />
      </IconButton>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!props.trainingPlanId && !props.exerciseId && (
          <div>
            <MenuItem id="add_exercise_btn" onClick={handleAddClose} disableRipple>
              <AddIcon />
              Add exercise
            </MenuItem>
          </div>
        )}

        {!props.planItemId && !props.exerciseId && (
          <MenuItem id="add_muscle_btn" onClick={handleAddClose} disableRipple>
            <AddIcon />
            Add muscle
          </MenuItem>
        )}

        <MenuItem onClick={handleEditClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>

        {currentUser.role === ROLES.MEMBER && (
          <MenuItem onClick={handleRemoveClose} disableRipple>
            <DeleteIcon />
            Remove
          </MenuItem>
        )}
      </StyledMenu>

      <DisplayAlert
        isRemoveClick={isRemoveClick}
        title="Delete"
        contentText="Are you sure you want to delete this item?"
        isTowButtons={true}
        setIsRemoveClick={setIsRemoveClick}
        setIsRemoveConfirmation={setIsRemoveConfirmation}
      />
    </div>
  );
}

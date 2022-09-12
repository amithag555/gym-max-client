import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../config";
import { deleteWorkoutGoalByIdSlice, selectCurrentWorkoutGoal } from "../redux/reducers/workoutGoalSlice";
import { deleteMemberByIdSlice, selectCurrentMember } from "../redux/reducers/memberSlice";

export default function DisplayAlert(props) {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);
  const currentWorkoutGoal = useSelector(selectCurrentWorkoutGoal);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      props.isMemberSelected ||
      props.isRemoveClick ||
      props.isDeleteMode ||
      props.isForbidden ||
      props.isWorkoutGoalDeleteMode ||
      props.isMemberDeleteMode ||
      props.isUserDeleteMode ||
      props.isFirstLogin
    ) {
      setOpen(true);
    }
  }, [
    props.isMemberSelected,
    props.isRemoveClick,
    props.isDeleteMode,
    props.isForbidden,
    props.isWorkoutGoalDeleteMode,
    props.isMemberDeleteMode,
    props.isUserDeleteMode,
    props.isFirstLogin,
  ]);

  const handleClose = (e) => {
    setOpen(false);

    if (props.isMemberSelected) {
      props.setIsMemberSelected(false);
    } else if (props.isRemoveClick) {
      props.setIsRemoveClick(false);

      if (e.target.id === "ok_btn") {
        props.setIsRemoveConfirmation(true);
      } else {
        props.setIsRemoveConfirmation(false);
      }
    } else if (props.isDeleteMode) {
      props.setIsDeleteMode(false);

      if (e.target.id === "ok_btn") {
        props.setIsDeleteConfirmation(true);
        props.setIsEditMode(false);
      } else {
        props.setIsDeleteConfirmation(false);
      }
    } else if (props.isForbidden) {
      props.setIsForbidden(false);

      if (currentUser.id) {
        if (currentUser.role === ROLES.MEMBER) {
          navigation("/");
        } else {
          navigation("/admin");
        }
      } else {
        navigation("/pageError403");
      }
    } else if (props.isWorkoutGoalDeleteMode) {
      props.setIsWorkoutGoalDeleteMode(false);

      if (e.target.id === "ok_btn") {
        dispatch(deleteWorkoutGoalByIdSlice(currentWorkoutGoal.id));
      }
    } else if (props.isMemberDeleteMode) {
      props.setIsMemberDeleteMode(false);

      if (e.target.id === "ok_btn") {
        dispatch(deleteMemberByIdSlice(currentMember.id));
        props.setIsMemberDeleteConfirmation(true);
      }
    } else if (props.isUserDeleteMode) {
      props.setIsUserDeleteMode(false);

      if (e.target.id === "ok_btn") {
        props.setIsUserDeleteConfirmation(true);
      }
    } else if (props.isFirstLogin) {
      props.setIsFirstLogin(false);
      navigation("/updatePassword");
    }
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props.title.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.contentText}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button id="ok_btn" onClick={handleClose}>
            ok
          </Button>
          {props.isTowButtons && (
            <Button id="cancel_btn" onClick={handleClose} autoFocus>
              cancel
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

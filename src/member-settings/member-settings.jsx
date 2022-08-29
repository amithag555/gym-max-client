import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTitle } from "../redux/reducers/generalSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IoKeyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function MemberSettings() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle("Settings"));
  }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem
        alignItems="flex-start"
        onClick={() => {
          navigation("/updatePassword");
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "transparent" }}>
            <IoKeyOutline style={{ fontSize: "1.6em", color: "grey" }} />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary="Change password"
          secondary={
            <React.Fragment>
              <Typography sx={{ display: "inline" }} component="span" variant="body2">
                it's a good idea to use a strong password
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      {/* <Divider variant="inset" component="li" /> */}
    </List>
  );
}

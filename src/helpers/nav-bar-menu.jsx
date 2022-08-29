import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { logout, selectCurrentUser } from "../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../config";
import { useNavigate } from "react-router-dom";

export default function NavBarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatarContent, setAvatarContent] = React.useState("");
  const currentUser = useSelector(selectCurrentUser);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (currentUser.role === ROLES.MEMBER) {
      const tempContent = `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();

      setAvatarContent(tempContent);
    } else {
      const tempContent = `${currentUser.username[0]}${currentUser.username[1]}`.toUpperCase();

      setAvatarContent(tempContent);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClickItem = () => {
    dispatch(logout());

    if (currentUser.role === ROLES.MEMBER) {
      navigation("/login");
    } else {
      navigation("/adminLogin");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 39, height: 39, fontSize: "0.8em" }}>{avatarContent}</Avatar>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {currentUser.role === ROLES.MEMBER && (
          <div>
            <MenuItem
              onClick={() => {
                navigation("/profile");
              }}
            >
              <Avatar /> Profile
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                navigation("/settings");
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </div>
        )}

        <MenuItem onClick={onLogoutClickItem}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

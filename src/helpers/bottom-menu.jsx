import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import whiteIcon from "../images/whiteLogo.png";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { BiChart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function BottomMenu() {
  const navigation = useNavigate();

  return (
    <React.Fragment>
      <AppBar position="fixed" className="bottom_menu_background_color" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <div className="member_bottom_menu_row row p-0 m-0 w-100 justify-content-between align-items-center">
            <div className="col-auto p-0 m-0 text-center">
              <Link to={`/classesSchedule`} className="member_menu_link">
                <PendingActionsOutlinedIcon className="member_bottom_menu_item" />
                <div className="member_bottom_menu_text p-0 m-0">Classes</div>
              </Link>
            </div>

            <div className="col-auto p-0 m-0 text-center ms-4">
              <Link to={`/loadStatistics`} className="member_menu_link">
                <BiChart className="member_bottom_menu_item" />
                <div className="member_bottom_menu_text p-0 m-0">Load statistics</div>
              </Link>
            </div>

            <div
              className="member_bottom_menu_icon_div"
              onClick={() => {
                navigation("/");
              }}
            >
              <img src={whiteIcon} alt="logo" className="member_bottom_menu_img_div w-100 shadow" />
            </div>

            <div className="col-auto p-0 m-0 text-center ms-4">
              <Link to={`/myTrainingPlans`} className="member_menu_link">
                <ListAltOutlinedIcon className="member_bottom_menu_item" />
                <div className="member_bottom_menu_text p-0 m-0">Training plans</div>
              </Link>
            </div>

            <div className="col-auto p-0 m-0 text-center">
              <Link to={`/workoutGoalStatistics`} className="member_menu_link">
                <InsertChartOutlinedIcon className="member_bottom_menu_item" />
                <div className="member_bottom_menu_text p-0 m-0">Goal statistics</div>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

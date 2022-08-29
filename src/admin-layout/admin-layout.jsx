import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ROLES, TOKEN_KEY } from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByTokenUsernameSlice, selectCurrentUser, selectErrorState } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import Loading from "../helpers/loading";
import MemberCard from "../member-card/member-card";
import { io } from "socket.io-client";
import { getMemberByIdSlice } from "../redux/reducers/memberSlice";
import "./admin-layout.css";
import { selectCurrentTitle } from "../redux/reducers/generalSlice";
import NavBarMenu from "../helpers/nav-bar-menu";
import whiteLogo from "../images/whiteLogo.png";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { Tooltip } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

const socket = io("http://localhost:3000");

let tempMember = {};

export default function AdminLayout() {
  const authErrorState = useSelector(selectErrorState);
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntry, setIsEntry] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isUnconfirmed, setIsUnconfirmed] = useState(false);
  const [currentSocketMember, setCurrentSocketMember] = useState({});
  const [entryQueue, setEntryQueue] = useState([]);
  const [isEntryRequest, setIsEntryRequest] = useState(false);
  const currentTitle = useSelector(selectCurrentTitle);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage[TOKEN_KEY]) {
      console.log("localStorage[TOKEN_KEY]");
      dispatch(getUserByTokenUsernameSlice(localStorage[TOKEN_KEY]));
    } else {
      navigation("/adminLogin");
    }
  }, []);

  useEffect(() => {
    if (currentUser.role === ROLES.RECEPTION) {
      socket.on("connect", (msg) => {
        console.log("connect");
      });

      socket.on("memberEntryClient", (_data) => {
        console.log(_data);

        tempMember = {
          id: _data[1],
          memberSocketId: _data[0],
        };

        setIsEntryRequest(true);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (isEntryRequest) {
      let tempEntryQueue = JSON.parse(JSON.stringify(entryQueue));
      tempEntryQueue.push(tempMember);

      setEntryQueue(tempEntryQueue);
      setIsEntryRequest(false);
    }
  }, [isEntryRequest]);

  useEffect(() => {
    if (!currentSocketMember.id && entryQueue.length > 0) {
      let tempEntryQueue = JSON.parse(JSON.stringify(entryQueue));
      const tempMember = tempEntryQueue.shift();

      setCurrentSocketMember(tempMember);
      dispatch(getMemberByIdSlice(tempMember.id));
      setIsEntry(true);
    }
  }, [entryQueue, currentSocketMember]);

  useEffect(() => {
    if (isConfirm || isUnconfirmed) {
      setCurrentSocketMember({});

      let tempEntryQueue = JSON.parse(JSON.stringify(entryQueue));
      tempEntryQueue.shift();

      setEntryQueue(tempEntryQueue);

      if (isConfirm) {
        setIsConfirm(false);
        socket.emit("adminConfirmServer", currentSocketMember.memberSocketId);
      } else {
        setIsUnconfirmed(false);
        socket.emit("adminUnconfirmedServer", currentSocketMember.memberSocketId);
      }
    }
  }, [isConfirm, isUnconfirmed]);

  useEffect(() => {
    if (authErrorState) {
      console.log("Error useEffect");
      console.log(authErrorState);
    }
  }, [authErrorState]);

  useEffect(() => {
    if (currentUser.id || (!currentUser.id && localStorage[TOKEN_KEY])) {
      setIsLoading(false);
    }
  }, [currentUser]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : !currentUser.id ? (
        <ValidateAuth />
      ) : (
        <div className="p-2" style={{ height: "100vh" }}>
          <div className="main_layout_div">
            <div className="row p-0 m-0" style={{ height: "96vh" }}>
              <div className="menu_layout_div p-0">
                <div className="logo_layout_div">
                  <Link to={`/admin`}>
                    <img src={whiteLogo} className="w-100" alt="whiteLogo" />
                  </Link>
                </div>

                <div className="menu_layout_items_div">
                  <div className="menu_layout_item_div">
                    <Link to={`/admin/classesSchedule`}>
                      <Tooltip title="Classes Schedule">
                        <PendingActionsOutlinedIcon className="icon_layout" />
                      </Tooltip>
                    </Link>
                  </div>

                  {(currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.TRAINER) && (
                    <div className="menu_layout_item_div">
                      <Link to={`/admin/trainingPlans`}>
                        <Tooltip title="Training Plans">
                          <ListAltOutlinedIcon className="icon_layout" />
                        </Tooltip>
                      </Link>
                    </div>
                  )}

                  {(currentUser.role === ROLES.ADMIN || currentUser.role === ROLES.RECEPTION) && (
                    <div className="menu_layout_item_div">
                      <Link to={`/admin/members`}>
                        <Tooltip title="Members Management">
                          <BadgeOutlinedIcon className="icon_layout" />
                        </Tooltip>
                      </Link>
                    </div>
                  )}

                  <div className="menu_layout_item_div">
                    <Link to={`/admin/loadStatistics`}>
                      <Tooltip title="Load Statistics">
                        <InsertChartOutlinedIcon className="icon_layout" />
                      </Tooltip>
                    </Link>
                  </div>

                  {currentUser.role === ROLES.ADMIN && (
                    <div className="menu_layout_item_div">
                      <Link to={`/admin/users`}>
                        <Tooltip title="Users Management">
                          <PersonOutlineOutlinedIcon className="icon_layout" />
                        </Tooltip>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="board_layout_div">
                <div className="header_layout_div">
                  <div className="p-0 col-auto" style={{ fontSize: "1.7em", fontWeight: "600" }}>
                    {currentTitle}
                  </div>

                  <div className="p-0 col-auto">
                    <NavBarMenu />
                  </div>
                </div>

                <div className="outlet_layout_div">
                  <Outlet />
                </div>
              </div>
            </div>

            {currentUser.role === ROLES.RECEPTION && (
              <MemberCard
                isEntry={isEntry}
                setIsEntry={setIsEntry}
                setIsConfirm={setIsConfirm}
                setIsUnconfirmed={setIsUnconfirmed}
                isEntryMode={true}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

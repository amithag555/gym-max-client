import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TOKEN_KEY } from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectErrorState, getMemberByTokenEmailSlice, selectCurrentUser } from "../redux/reducers/authSlice";
import ValidateAuth from "../helpers/validate-auth";
import Loading from "../helpers/loading";
import BottomMenu from "../helpers/bottom-menu";
import "./member-layout.css";
import NavBarMenu from "../helpers/nav-bar-menu";
import icon from "../images/logo.png";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { selectCurrentTitle } from "../redux/reducers/generalSlice";

export default function MemberLayout() {
  const currentUser = useSelector(selectCurrentUser);
  const errorState = useSelector(selectErrorState);
  const [isLoading, setIsLoading] = useState(true);
  const currentTitle = useSelector(selectCurrentTitle);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage[TOKEN_KEY]) {
      console.log("localStorage[TOKEN_KEY]");
      dispatch(getMemberByTokenEmailSlice(localStorage[TOKEN_KEY]));
    } else {
      navigation("/login");
    }
  }, []);

  useEffect(() => {
    if (errorState) {
      console.log("Error useEffect");
      console.log(errorState);
    }
  }, [errorState]);

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
        <React.Fragment>
          <div className="p-0 m-0" style={{ position: "relative" }}>
            <div className="member_nav_bar shadow">
              {!(location.pathname === "/") ? (
                <div className="row p-0 m-0 col-auto align-items-center">
                  <div
                    className="col-auto p-0 m-0"
                    onClick={() => {
                      navigation(-1);
                    }}
                  >
                    <KeyboardBackspaceIcon sx={{ fontSize: "1.9em" }} />
                  </div>

                  <div className="col-auto" style={{ fontSize: "1.1em", fontWeight: "600" }}>
                    {currentTitle}
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="col-auto">
                    <img src={icon} alt="logo" className="w-100" style={{ width: "40px", height: "40px" }} />
                  </div>

                  <div className="col-auto" style={{ fontSize: "1.1em", fontWeight: "600" }}>
                    Hey {currentUser.fullName}
                  </div>
                </React.Fragment>
              )}

              <div className="col-auto">
                <NavBarMenu />
              </div>
            </div>

            <div className="my-3">
              <Outlet />
            </div>

            <BottomMenu />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

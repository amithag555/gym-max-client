import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function HomePageAdmin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle("Welcome To Gymove"));
  }, []);

  return <div>home-page-admin</div>;
}

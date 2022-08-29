import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="row p-0 m-0 align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="row p-0 m-0 align-items-center justify-content-center" style={{ height: "80px", width: "80px" }}>
        <CircularProgress className="p-0 w-100 h-100" />
      </div>
    </div>
  );
}

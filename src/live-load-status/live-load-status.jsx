import React, { useEffect } from "react";
import { useState } from "react";
import loadStatus from "../images/icons8-graph-96.png";
import { getClubByIdService } from "../services/club.service";
import "./live-load-status.css";

export default function LiveLoadStatus() {
  const [club, setClub] = useState({});

  useEffect(() => {
    getClubById(1);
  }, []);

  const getClubById = async (_clubId) => {
    try {
      const response = await getClubByIdService(_clubId);

      if (response.id) {
        setClub(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div
        className="border_radius row p-0 m-0 mx-auto bg-white py-3 px-3 shadow align-items-center"
        style={{ maxWidth: "250px" }}
      >
        <div className="load_icon_div p-0 m-0">
          <img src={loadStatus} alt="loadStatus" className="w-75" />
        </div>

        <div className="col-8 text-center p-0">
          <h6 className="p-0 m-0 mt-1">Real Time Load</h6>

          {club.currentMembersCount <= 60 ? (
            <div className="text-success p-0 mt-1" style={{ fontSize: "1.5em", fontWeight: 600 }}>
              LOW
            </div>
          ) : club.currentMembersCount <= 120 ? (
            <div className="text-warning p-0 mt-1" style={{ fontSize: "1.5em", fontWeight: 600 }}>
              MEDIUM
            </div>
          ) : (
            <div className="text-danger p-0 mt-1" style={{ fontSize: "1.5em", fontWeight: 600 }}>
              LOADED
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

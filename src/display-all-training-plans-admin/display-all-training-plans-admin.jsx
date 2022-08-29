import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import {
  defineCurrentMemberById,
  getAllMembersSlice,
  selectAllMembers,
  selectCurrentMember,
} from "../redux/reducers/memberSlice";
import "./display-all-training-plans-admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTrainingPlan,
  selectAllMemberTrainingPlans,
  deleteCurrentTrainingPlan,
  selectCurrentTrainingPlan,
  getTrainingPlansByPageNumberAndPerPageSlice,
  getTrainingPlansByMemberIdPageNumberAndPerPageSlice,
} from "../redux/reducers/trainingPlanSlice";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DisplayAlert from "../helpers/display-alert";
import ValidateAuth from "../helpers/validate-auth";
import { ROLES } from "../config";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import MyPagination from "../helpers/my-pagination";
import { getMemberTrainingPlansCountService, getTrainingPlansCountService } from "../services/training-plan.service";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayAllTrainingPlansAdmin() {
  const [isMemberSelected, setIsMemberSelected] = useState(false);
  const members = useSelector(selectAllMembers);
  const currentMember = useSelector(selectCurrentMember);
  const trainingPlans = useSelector(selectAllTrainingPlan);
  const currentTrainingPlan = useSelector(selectCurrentTrainingPlan);
  const memberTrainingPlans = useSelector(selectAllMemberTrainingPlans);
  const currentUser = useSelector(selectCurrentUser);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [trainingPlanCount, setTrainingPlanCount] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  let payload = {
    pageNumber: pageNumber,
    perPage: perPage,
    memberId: currentMember.id,
  };

  let itemNumber = (pageNumber - 1) * perPage;

  useEffect(() => {
    dispatch(getAllMembersSlice());

    if (trainingPlans.length < 1 && memberTrainingPlans.length < 1) {
      dispatch(getTrainingPlansByPageNumberAndPerPageSlice(payload));
      getTrainingPlansCount();
    }

    if (currentTrainingPlan.title) {
      dispatch(deleteCurrentTrainingPlan());
    }
  }, []);

  useEffect(() => {
    if (currentMember.id) {
      dispatch(setCurrentTitle(`${currentMember.fullName}'s Training Plans`));
    } else {
      dispatch(setCurrentTitle("All Training Plans"));
    }
  }, [currentMember]);

  useEffect(() => {
    if (trainingPlans.length > 1 || memberTrainingPlans.length > 1) {
      handleChangePerPageOrPageNumber();
    }
  }, [pageNumber, perPage]);

  const handleChangePerPageOrPageNumber = () => {
    payload = {
      pageNumber: pageNumber,
      perPage: perPage,
      memberId: currentMember.id,
    };

    if (currentMember.id) {
      dispatch(getTrainingPlansByMemberIdPageNumberAndPerPageSlice(payload));
      getMemberTrainingPlansCount(currentMember.id);
    } else {
      dispatch(getTrainingPlansByPageNumberAndPerPageSlice(payload));
      getTrainingPlansCount();
    }
  };

  const onChangeAutocomplete = (event, value) => {
    setPageNumber(1);
    setPerPage(10);

    payload = {
      pageNumber: 1,
      perPage: 10,
      memberId: value.id,
    };

    dispatch(defineCurrentMemberById(value.id));
    dispatch(getTrainingPlansByMemberIdPageNumberAndPerPageSlice(payload));
    getMemberTrainingPlansCount(value.id);
  };

  const onKeyDownAutocomplete = (event, value) => {
    if (event.key === "Enter" && value === undefined) {
      setPageNumber(1);
      setPerPage(10);

      payload = {
        pageNumber: 1,
        perPage: 10,
      };

      dispatch(defineCurrentMemberById(-1));
      dispatch(getTrainingPlansByPageNumberAndPerPageSlice(payload));
      getTrainingPlansCount();
    }
  };

  const onCreateTrainingPlanClick = () => {
    if (currentMember.id) {
      navigation("/admin/createTrainingPlan");
    } else {
      setIsMemberSelected(true);
    }
  };

  const getTrainingPlansCount = async () => {
    try {
      const response = await getTrainingPlansCountService();

      if (response) {
        setTrainingPlanCount(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMemberTrainingPlansCount = async (_memberId) => {
    try {
      const response = await getMemberTrainingPlansCountService(_memberId);

      if (response) {
        setTrainingPlanCount(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {currentUser?.role !== ROLES.ADMIN && currentUser?.role !== ROLES.TRAINER ? (
        <ValidateAuth />
      ) : (
        <div className="table_div border_radius light_grey_background_color">
          <div className="border_radius card border-0">
            <div className="border_radius_top card-header p-3">
              <div className="row justify-content-end m-0 p-0">
                <div className="row col-7 p-0 m-0 align-items-center justify-content-end">
                  <div className="col-6 m-0 p-0">
                    <Autocomplete
                      onChange={onChangeAutocomplete}
                      onKeyDown={onKeyDownAutocomplete}
                      freeSolo
                      disableClearable
                      options={members.map((item) => {
                        return { id: item.id, label: `${item.fullName} - ${item.phoneNumber}` };
                      })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Member"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="m-0 p-0 col-auto mx-3">
                    <button className="add_btn p-3 rounded-3 border-0" onClick={onCreateTrainingPlanClick}>
                      <AddIcon />
                      Create training plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <DisplayAlert
              isMemberSelected={isMemberSelected}
              title="Member selection"
              contentText="It is necessary to select a member in order to create a training plan."
              isTowButtons={false}
              setIsMemberSelected={setIsMemberSelected}
            />

            <div className="card-body border_radius_bottom p-4 light_grey_background_color">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr role="row">
                      <th scope="col" style={{ width: "10%" }}>
                        No.
                      </th>
                      <th className="text-center" scope="col" style={{ width: "70%" }}>
                        Training Plan Name
                      </th>
                      <th className="text-center" scope="col" style={{ width: "20%" }}>
                        Trainer Name
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentMember.id ? (
                      memberTrainingPlans?.length > 0 ? (
                        memberTrainingPlans?.map((item) => {
                          itemNumber++;

                          return (
                            <tr
                              role="row"
                              key={item.id}
                              className="table_data_div"
                              onClick={(e) => {
                                navigation(`/admin/trainingPlan/${e.target.id}`);
                              }}
                            >
                              <td id={item.id}>{itemNumber}</td>
                              <td id={item.id} className="text-center">
                                {item.title}
                              </td>
                              <td id={item.id} className="text-center">
                                {item.trainerName}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center">
                          <td></td>
                          <td className="fs-4">No results found !</td>
                          <td></td>
                        </tr>
                      )
                    ) : (
                      trainingPlans?.map((item) => {
                        itemNumber++;

                        return (
                          <tr
                            role="row"
                            key={item.id}
                            className="table_data_div"
                            onClick={(e) => {
                              navigation(`/admin/trainingPlan/${e.target.id}`);
                            }}
                          >
                            <td id={item.id}>{itemNumber}</td>
                            <td id={item.id} className="text-center">
                              {item.title}
                            </td>
                            <td id={item.id} className="text-center">
                              {item.trainerName}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <MyPagination
                setPageNumber={setPageNumber}
                setPerPage={setPerPage}
                count={trainingPlanCount}
                pageNumber={pageNumber}
                perPage={perPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

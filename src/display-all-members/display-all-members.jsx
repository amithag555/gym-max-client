import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../config";
import ValidateAuth from "../helpers/validate-auth";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import AddIcon from "@mui/icons-material/Add";
import {
  getMembersByPageNumberAndPerPageSlice,
  selectAllMembers,
  getMembersByNameOrPhoneNumberSlice,
  defineCurrentMemberById,
  deleteMemberByIdSlice,
  selectCurrentMember,
  defineCurrentMember,
} from "../redux/reducers/memberSlice";
import MyPagination from "../helpers/my-pagination";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { getMembersCountService, getSearchMembersCountService } from "../services/member.service";
import "./display-all-members.css";
import MemberForm from "../member-form/member-form";
import DisplayAlert from "../helpers/display-alert";
import MemberCard from "../member-card/member-card";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayAllMembers() {
  const [searchInput, setSearchInput] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);
  const members = useSelector(selectAllMembers);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [membersCount, setMembersCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [isMemberDeleteMode, setIsMemberDeleteMode] = useState(false);
  const [isMemberDeleteConfirmation, setIsMemberDeleteConfirmation] = useState(false);
  const [isMemberSelected, setIsMemberSelected] = useState(false);

  const badgeColor = {
    ACTIVE: "success",
    SUSPEND: "warning",
    CANCELLED: "danger",
  };

  const dispatch = useDispatch();

  let payload = {
    pageNumber: pageNumber,
    perPage: perPage,
    q: searchInput,
  };

  let itemNumber = (pageNumber - 1) * perPage;

  useEffect(() => {
    dispatch(getMembersByPageNumberAndPerPageSlice(payload));
    getMembersCount();
    dispatch(setCurrentTitle("Members Management"));
  }, []);

  useEffect(() => {
    if (isChangeMode) {
      setPageNumber(1);
      setPayload(1);

      dispatch(getMembersByPageNumberAndPerPageSlice(payload));
      getMembersCount();
      setIsChangeMode(false);
    }
  }, [isChangeMode]);

  useEffect(() => {
    handleChangePerPageOrPageNumber();
  }, [pageNumber, perPage]);

  useEffect(() => {
    if (isMemberDeleteConfirmation) {
      setPageNumber(1);
      setPayload(1);

      dispatch(deleteMemberByIdSlice(currentMember.id));
      dispatch(getMembersByPageNumberAndPerPageSlice(payload));
      getMembersCount();
      setIsMemberDeleteConfirmation(false);
    }
  }, [isMemberDeleteConfirmation]);

  const handleChangePerPageOrPageNumber = () => {
    payload = {
      pageNumber: pageNumber,
      perPage: perPage,
      q: searchInput,
    };

    if (searchInput) {
      dispatch(getMembersByNameOrPhoneNumberSlice(payload));
    } else {
      dispatch(getMembersByPageNumberAndPerPageSlice(payload));
    }
  };

  const onSearchEnterHandler = (e) => {
    if (e.key === "Enter") {
      setPageNumber(1);

      payload = {
        pageNumber: 1,
        perPage: perPage,
        q: searchInput,
      };

      dispatch(getMembersByNameOrPhoneNumberSlice(payload));
      getSearchMembersCount(searchInput);
    }
  };

  const getMembersCount = async () => {
    try {
      const response = await getMembersCountService();

      if (response) {
        setMembersCount(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSearchMembersCount = async (_searchText) => {
    try {
      const response = await getSearchMembersCountService(_searchText);

      if (response) {
        setMembersCount(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setPayload = (_pageNumber) => {
    payload = {
      pageNumber: _pageNumber,
      perPage: perPage,
      q: searchInput,
    };
  };

  return (
    <div>
      {currentUser?.role !== ROLES.ADMIN && currentUser?.role !== ROLES.RECEPTION ? (
        <ValidateAuth />
      ) : (
        <div className="table_div border_radius light_grey_background_color">
          <div className="border_radius card border-0">
            <div className="border_radius_top card-header p-3">
              <div className="row justify-content-end m-0 p-0">
                <div className="row col-7 p-0 m-0 align-items-center justify-content-end">
                  <div className="col-6 m-0 p-0">
                    <TextField
                      value={searchInput}
                      label="Search member by name or phone"
                      className="w-100"
                      onInput={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      onKeyDown={onSearchEnterHandler}
                    />
                  </div>

                  {currentUser.role === ROLES.ADMIN && (
                    <div className="m-0 p-0 text-center col-auto mx-3">
                      <button
                        className="add_btn p-3 rounded-3 border-0"
                        onClick={() => {
                          setIsCreationMode(true);
                        }}
                      >
                        <AddIcon />
                        Create member
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card-body border_radius_bottom p-4 light_grey_background_color">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr role="row">
                      <th scope="col" style={{ width: "5%" }}>
                        No.
                      </th>
                      <th className="text-center" scope="col" style={{ width: "14%" }}>
                        Name
                      </th>
                      <th className="text-center" scope="col" style={{ width: "14%" }}>
                        Phone
                      </th>
                      <th className="text-center" scope="col" style={{ width: "14%" }}>
                        Joining Date
                      </th>
                      <th className="text-center" scope="col" style={{ width: "14%" }}>
                        Expired Date
                      </th>
                      <th className="text-center" scope="col" style={{ width: "14%" }}>
                        Status
                      </th>
                      <th className="text-center" scope="col" style={{ width: "10%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {members.length > 0 &&
                      members.map((item, i) => {
                        itemNumber++;

                        return (
                          <tr role="row" key={item.id} className="table_data_div">
                            <td
                              id={item.id}
                              onClick={() => {
                                dispatch(defineCurrentMember(item));
                                setIsMemberSelected(true);
                              }}
                            >
                              {itemNumber}
                            </td>

                            <td
                              id={item.id}
                              className="text-center"
                              onClick={() => {
                                dispatch(defineCurrentMember(item));
                                setIsMemberSelected(true);
                              }}
                            >
                              {item.fullName}
                            </td>

                            <td
                              id={item.id}
                              className="text-center"
                              onClick={() => {
                                dispatch(defineCurrentMember(item));
                                setIsMemberSelected(true);
                              }}
                            >
                              {item.phoneNumber}
                            </td>

                            <td
                              id={item.id}
                              className="text-center"
                              onClick={() => {
                                dispatch(defineCurrentMember(item));
                                setIsMemberSelected(true);
                              }}
                            >
                              {`${new Date(item.creationDate).getDate()}/${
                                new Date(item.creationDate).getMonth() + 1
                              }/${new Date(item.creationDate).getFullYear()}`}
                            </td>

                            <td
                              id={item.id}
                              className="text-center"
                              onClick={() => {
                                dispatch(defineCurrentMember(item));
                                setIsMemberSelected(true);
                              }}
                            >
                              {`${new Date(item.expiredDate).getDate()}/${
                                new Date(item.expiredDate).getMonth() + 1
                              }/${new Date(item.expiredDate).getFullYear()}`}
                            </td>

                            <td
                              id={item.id}
                              className="text-center"
                              onClick={() => {
                                dispatch(defineCurrentMember(item));
                                setIsMemberSelected(true);
                              }}
                            >
                              <div className={`badge bg-${badgeColor[item.status]}`}>{item.status}</div>
                            </td>

                            <td id={item.id} className="text-center">
                              <div className="row p-0 m-0 justify-content-around">
                                <div className="p-0 m-0 col-5 text-end">
                                  <button
                                    className="member_edit_btn shadow"
                                    onClick={() => {
                                      setIsEditMode(true);
                                      dispatch(defineCurrentMemberById(item.id));
                                    }}
                                  >
                                    <EditRoundedIcon style={{ fontSize: "1.25em" }} />
                                  </button>
                                </div>

                                {currentUser.role === ROLES.ADMIN && (
                                  <div className="p-0 m-0 col-5 text-start">
                                    <button
                                      className="member_delete_btn shadow"
                                      onClick={() => {
                                        setIsMemberDeleteMode(true);
                                        dispatch(defineCurrentMemberById(item.id));
                                      }}
                                    >
                                      <DeleteRoundedIcon style={{ fontSize: "1.25em" }} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {members.length < 1 && <div className="text-center fs-4">No found results !</div>}

              <MyPagination
                setPageNumber={setPageNumber}
                setPerPage={setPerPage}
                count={membersCount}
                pageNumber={pageNumber}
                perPage={perPage}
              />

              <MemberForm
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                isCreationMode={isCreationMode}
                setIsCreationMode={setIsCreationMode}
                setIsChangeMode={setIsChangeMode}
              />

              <MemberCard
                isEntryMode={false}
                setIsMemberSelected={setIsMemberSelected}
                isMemberSelected={isMemberSelected}
              />

              <DisplayAlert
                title="Delete"
                contentText="Are you sure you want to delete this member?"
                isTowButtons={true}
                isMemberDeleteMode={isMemberDeleteMode}
                setIsMemberDeleteMode={setIsMemberDeleteMode}
                setIsMemberDeleteConfirmation={setIsMemberDeleteConfirmation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

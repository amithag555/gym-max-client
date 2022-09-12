import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../config";
import ValidateAuth from "../helpers/validate-auth";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import AddIcon from "@mui/icons-material/Add";
import MyPagination from "../helpers/my-pagination";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DisplayAlert from "../helpers/display-alert";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import "./display-all-users.css";
import {
  getUsersByPageNumberAndPerPageService,
  getUsersCountService,
  getSearchUsersCountService,
  getUsersByUsernameService,
  deleteUserByIdService,
} from "../services/user.service";
import UserForm from "../user-form/user-form";
import UpdatePasswordFormAdmin from "../update-password-form-admin/update-password-form-admin";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function DisplayAllUsers() {
  const [searchInput, setSearchInput] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [usersCount, setUsersCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [isUserDeleteMode, setIsUserDeleteMode] = useState(false);
  const [isUpdatePasswordMode, setIsUpdatePasswordMode] = useState(false);
  const [isUserDeleteConfirmation, setIsUserDeleteConfirmation] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const dispatch = useDispatch();

  let payload = {
    pageNumber: pageNumber,
    perPage: perPage,
    q: searchInput,
  };

  let itemNumber = (pageNumber - 1) * perPage;

  useEffect(() => {
    getUsersByPageNumberAndPerPage(payload);
    dispatch(setCurrentTitle("Users Management"));
  }, []);

  useEffect(() => {
    if (isChangeMode) {
      if (selectedUser.id) {
        const tempUsers = users.map((item) => (item.id === selectedUser.id ? selectedUser : item));
        setUsers(tempUsers);
      } else {
        setPageNumber(1);
        setPayload(1);
        getUsersByPageNumberAndPerPage(payload);
      }

      setIsChangeMode(false);
    }
  }, [isChangeMode]);

  useEffect(() => {
    handleChangePerPageOrPageNumber();
  }, [pageNumber, perPage]);

  useEffect(() => {
    if (isUserDeleteConfirmation) {
      setPageNumber(1);
      setPayload(1);

      deleteUserById(selectedUser.id, payload);
      setIsUserDeleteConfirmation(false);
    }
  }, [isUserDeleteConfirmation]);

  const handleChangePerPageOrPageNumber = () => {
    payload = {
      pageNumber: pageNumber,
      perPage: perPage,
      q: searchInput,
    };

    if (searchInput) {
      getUsersByUsername(payload);
    } else {
      getUsersByPageNumberAndPerPage(payload);
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

      getUsersByUsername(payload);
    }
  };

  const getUsersByPageNumberAndPerPage = async (_payload) => {
    try {
      const response = await getUsersByPageNumberAndPerPageService(_payload);

      if (response) {
        setUsers(response);
        getUsersCount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersCount = async () => {
    try {
      const response = await getUsersCountService();

      if (response) {
        setUsersCount(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchUsersCount = async (_searchText) => {
    try {
      const response = await getSearchUsersCountService(_searchText);

      if (response) {
        setUsersCount(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersByUsername = async (_payload) => {
    try {
      const response = await getUsersByUsernameService(_payload);

      if (response) {
        setUsers(response);
        getSearchUsersCount(_payload.q);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserById = async (_userId, _payload) => {
    try {
      const response = await deleteUserByIdService(_userId);

      if (response.id) {
        setSelectedUser({});
        getUsersByPageNumberAndPerPage(_payload);
      }
    } catch (error) {
      console.log(error);
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
      {currentUser?.role !== ROLES.ADMIN ? (
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
                      label="Search user by username"
                      className="w-100"
                      onInput={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      onKeyDown={onSearchEnterHandler}
                    />
                  </div>

                  <div className="m-0 p-0 text-center col-auto mx-3">
                    <button
                      className="add_btn p-3 rounded-3 border-0"
                      onClick={() => {
                        setIsCreationMode(true);
                        setSelectedUser({});
                      }}
                    >
                      <AddIcon />
                      Create user
                    </button>
                  </div>
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
                      <th className="text-center" scope="col" style={{ width: "16%" }}>
                        Username
                      </th>
                      <th className="text-center" scope="col" style={{ width: "16%" }}>
                        First Name
                      </th>
                      <th className="text-center" scope="col" style={{ width: "16%" }}>
                        Last Name
                      </th>
                      <th className="text-center" scope="col" style={{ width: "16%" }}>
                        Permission
                      </th>
                      <th className="text-center" scope="col" style={{ width: "16%" }}>
                        Status
                      </th>
                      <th className="text-center" scope="col" style={{ width: "13%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.length > 0 &&
                      users.map((item, i) => {
                        itemNumber++;

                        return (
                          <tr role="row" key={item.id} className="table_data_div">
                            <td id={item.id}>{itemNumber}</td>

                            <td id={item.id} className="text-center">
                              {item.username}
                            </td>

                            <td id={item.id} className="text-center">
                              {!item.firstName ? <span>-</span> : item.firstName}
                            </td>

                            <td id={item.id} className="text-center">
                              {!item.lastName ? <span>-</span> : item.lastName}
                            </td>

                            <td id={item.id} className="text-center">
                              {item.role}
                            </td>

                            <td id={item.id} className="text-center">
                              {item.isActive ? (
                                <div className="badge bg-success">Active</div>
                              ) : (
                                <div className="badge bg-danger">Inactive</div>
                              )}
                            </td>

                            <td id={item.id} className="text-center">
                              <div className="row p-0 m-0 justify-content-around">
                                <div className="p-0 m-0 col-4 text-end">
                                  <button
                                    className="user_edit_btn shadow"
                                    onClick={() => {
                                      setIsEditMode(true);
                                      setSelectedUser(item);
                                    }}
                                  >
                                    <EditRoundedIcon style={{ fontSize: "1.25em" }} />
                                  </button>
                                </div>

                                <div className="p-0 m-0 col-4">
                                  <button
                                    className="user_password_btn shadow"
                                    onClick={() => {
                                      setIsUpdatePasswordMode(true);
                                      setSelectedUser(item);
                                    }}
                                  >
                                    <KeyRoundedIcon style={{ fontSize: "1.25em" }} />
                                  </button>
                                </div>

                                <div className="p-0 m-0 col-4 text-start">
                                  <button
                                    className="user_delete_btn shadow"
                                    onClick={() => {
                                      setIsUserDeleteMode(true);
                                      setSelectedUser(item);
                                    }}
                                  >
                                    <DeleteRoundedIcon style={{ fontSize: "1.25em" }} />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {users.length < 1 && <div className="text-center fs-4">No found results !</div>}

              <MyPagination
                setPageNumber={setPageNumber}
                setPerPage={setPerPage}
                count={usersCount}
                pageNumber={pageNumber}
                perPage={perPage}
              />

              <UserForm
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                isCreationMode={isCreationMode}
                setIsCreationMode={setIsCreationMode}
                setIsChangeMode={setIsChangeMode}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />

              {isUpdatePasswordMode && (
                <UpdatePasswordFormAdmin
                  isUpdatePasswordMode={isUpdatePasswordMode}
                  setIsUpdatePasswordMode={setIsUpdatePasswordMode}
                  selectedUser={selectedUser}
                />
              )}

              <DisplayAlert
                title="Delete"
                contentText="Are you sure you want to delete this user?"
                isTowButtons={true}
                isUserDeleteMode={isUserDeleteMode}
                setIsUserDeleteMode={setIsUserDeleteMode}
                setIsUserDeleteConfirmation={setIsUserDeleteConfirmation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

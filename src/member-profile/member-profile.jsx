import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateCurrentUser } from "../redux/reducers/authSlice";
import "./member-profile.css";
import noImage from "../images/noImage.jpg";
import { CLOUDINARY_PRESETS_NAME } from "../config";
import cloudinaryApi from "../cloudinaryApi";
import { selectCurrentMember, updateImgUrlSlice } from "../redux/reducers/memberSlice";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { setCurrentTitle } from "../redux/reducers/generalSlice";

export default function MemberProfile() {
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTitle(""));
  }, []);

  useEffect(() => {
    if (currentMember.id) {
      dispatch(updateCurrentUser(currentMember));
    }
  }, [currentMember]);

  const uploadImage = async (_files) => {
    if (_files[0]) {
      try {
        const formData = new FormData();

        formData.append("file", _files[0]);
        formData.append("upload_preset", CLOUDINARY_PRESETS_NAME);

        const response = await (await cloudinaryApi.post("", formData)).data;

        if (response) {
          const payload = {
            newImgUrl: {
              imgUrl: response.secure_url,
            },
            memberId: currentUser.id,
          };

          dispatch(updateImgUrlSlice(payload));
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div>
      <div className="profile_main_div">
        <div className="profile_cover_div">
          <div className="profile_cover_title_div">Profile</div>
          <div className="profile_details_div shadow">
            <div className="w-75 h-75 text-center">
              <div className="mb-3">
                <div className="profile_details_content font_color_blue" style={{ fontSize: "1.4em", fontWeight: "500" }}>
                  {currentUser.fullName}
                </div>
              </div>

              <div className="mb-4">
                <div className="profile_details_content">{currentUser.email}</div>
                <div className="profile_details_title">Email</div>
              </div>

              <div className="mb-4">
                <div className="profile_details_content">
                  {`${new Date(currentUser.creationDate).getDate()}/${
                    new Date(currentUser.creationDate).getMonth() + 1
                  }/${new Date(currentUser.creationDate).getFullYear()}`}
                </div>
                <div className="profile_details_title">Joining Date</div>
              </div>

              <div className="mb-4">
                <div className="profile_details_content">
                  {`${new Date(currentUser.expiredDate).getDate()}/${
                    new Date(currentUser.expiredDate).getMonth() + 1
                  }/${new Date(currentUser.expiredDate).getFullYear()}`}
                </div>
                <div className="profile_details_title">Expired Date</div>
              </div>
            </div>
          </div>
          <div className="profile_img_div">
            <img src={currentUser.imgUrl ? currentUser.imgUrl : noImage} alt="img" className="member_img w-100 shadow" />
          </div>

          <div className="profile_upload_file_div p-0">
            <label className="profile_upload_file_label w-100 h-100 p-0 m-0 shadow">
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(e.target.files);
                }}
              />
              <CameraAltRoundedIcon style={{ fontSize: "1.2em" }} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

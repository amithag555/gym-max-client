import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./member-card.css";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import noImage from "../images/noImage.jpg";
import { CLOUDINARY_PRESETS_NAME } from "../config";
import cloudinaryApi from "../cloudinaryApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMember, updateImgUrlSlice } from "../redux/reducers/memberSlice";

export default function MemberCard(props) {
  const [open, setOpen] = React.useState(false);
  const currentMember = useSelector(selectCurrentMember);

  const badgeColor = {
    ACTIVE: "success",
    SUSPEND: "warning",
    CANCELLED: "danger",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isEntry || props.isMemberSelected) {
      setOpen(true);
    }
  }, [props.isEntry, props.isMemberSelected]);

  const onOkClickBtn = () => {
    setOpen(false);
    props.setIsEntry(false);
    props.setIsConfirm(true);
  };

  const onCloseClickBtn = () => {
    setOpen(false);

    if (props.isEntry) {
      props.setIsEntry(false);
      props.setIsUnconfirmed(true);
    } else {
      props.setIsMemberSelected(false);
    }
  };

  const uploadImage = async (_files) => {
    if (_files[0]) {
      try {
        const formData = new FormData();

        formData.append("file", _files[0]);
        formData.append("upload_preset", CLOUDINARY_PRESETS_NAME);

        const response = await (await cloudinaryApi.post("", formData)).data;
        console.log(response);

        if (response) {
          const payload = {
            newImgUrl: {
              imgUrl: response.secure_url,
            },
            memberId: currentMember.id,
          };

          dispatch(updateImgUrlSlice(payload));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth="md" open={open}>
        <DialogTitle>CUSTOMER CARD</DialogTitle>

        <DialogContent style={{ backgroundColor: "#f7f7f7" }}>
          <div className="border_radius p-3 shadow mt-3 bg-white mx-auto" style={{ height: "400px", width: "90%" }}>
            <div className="border_radius row p-0 m-0 border-dark mx-auto" style={{ height: "370px" }}>
              <div className="border_radius row p-0 m-0 align-items-center" style={{ width: "45%" }}>
                <div className="member_left_div p-0 d-flex justify-content-center">
                  <div className="member_img_div">
                    <img
                      src={currentMember.imgUrl ? currentMember.imgUrl : noImage}
                      alt="img"
                      className="member_img w-100 shadow"
                    />
                  </div>

                  <div className="member_upload_file_div p-0 m-0">
                    <label className="member_upload_file_label w-100 h-100 p-0 m-0 shadow">
                      <input
                        type="file"
                        onChange={(e) => {
                          uploadImage(e.target.files);
                        }}
                      />
                      <AddPhotoAlternateOutlinedIcon />
                    </label>
                  </div>
                </div>
              </div>

              <div className="border_radius d-flex align-items-center p-0" style={{ width: "55%" }}>
                <div className="w-100" style={{ height: "280px" }}>
                  <div className="row p-0 m-0 w-75 align-items-center">
                    <div className="col-auto p-0 me-4">
                      <h4 className="p-0 m-0">{currentMember.fullName}</h4>
                    </div>

                    <div
                      className={`col-auto text-center py-1 px-2 rounded-3 bg-${
                        badgeColor[currentMember.status]
                      } text-white`}
                      style={{ fontSize: "0.7em" }}
                    >
                      {currentMember.status}
                    </div>
                  </div>

                  <div className="mt-4" style={{ fontSize: "0.95em", fontWeight: "700" }}>
                    <span className="grey_color me-2">Email:</span>
                    <span>{currentMember.email}</span>
                  </div>

                  <div className="mt-4" style={{ fontSize: "0.95em", fontWeight: "700" }}>
                    <span className="grey_color me-2">Phone Number:</span>
                    <span>{currentMember.phoneNumber}</span>
                  </div>

                  <div className="mt-4" style={{ fontSize: "0.95em", fontWeight: "700" }}>
                    <span className="grey_color me-2">Address:</span>
                    <span>{currentMember.address ? currentMember.address : "- - - - - -"}</span>
                  </div>

                  <div className="mt-4" style={{ fontSize: "0.95em", fontWeight: "700" }}>
                    <span className="grey_color me-2">Joining Date:</span>
                    <span>
                      {`${new Date(currentMember.creationDate).getDate()}/${
                        new Date(currentMember.creationDate).getMonth() + 1
                      }/${new Date(currentMember.creationDate).getFullYear()}`}
                    </span>
                  </div>

                  <div className="mt-4" style={{ fontSize: "0.95em", fontWeight: "700" }}>
                    <span className="grey_color me-2">Expired Date:</span>
                    <span>
                      {`${new Date(currentMember.expiredDate).getDate()}/${
                        new Date(currentMember.expiredDate).getMonth() + 1
                      }/${new Date(currentMember.expiredDate).getFullYear()}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          {props.isEntryMode && <Button onClick={onOkClickBtn}>Ok</Button>}
          <Button onClick={onCloseClickBtn}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

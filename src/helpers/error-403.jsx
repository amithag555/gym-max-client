import React from "react";

export default function Error403() {
  return (
    <div className="h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-5">
            <div className="text-center">
              <h1>403</h1>

              <h4>
                <i className="text-danger" /> Forbidden Error!
              </h4>

              <p>You do not have permission to view this resource.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

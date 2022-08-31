import React from "react";

export default function Error404() {
  return (
    <div className="h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-8">
            <div className="text-center">
              <h1 className="">404</h1>

              <h4>
                <i className="text-warning" /> The page you were looking for is not found!
              </h4>

              <p>You may have mistyped the address or the page may have moved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

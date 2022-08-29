import React, { useState } from "react";
import DisplayAlert from "./display-alert";

export default function ValidateAuth(props) {
  const [isForbidden, setIsForbidden] = useState(true);

  return (
    <div>
      <DisplayAlert
        title="Permissions issue"
        contentText="No permission to perform this process."
        isForbidden={isForbidden}
        setIsForbidden={setIsForbidden}
      />
    </div>
  );
}

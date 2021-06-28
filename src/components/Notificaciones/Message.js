import React from "react";
export default ({ userName, message }) => {
  return (
    <>
      <div className="media">
        <div className="media-body">
          <h5 className="mt-0">{userName}</h5>
          <p>{message}</p>
        </div>
      </div>
      <div className="dropdown-divider"></div>
    </>
  );
};
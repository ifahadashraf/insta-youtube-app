import React from "react";
import avatar from "../boy.svg";

export const ListItem = ({ children }) => (
  <div
    style={{
      display: "inline-flex",
      marginBottom: "10px"
    }}
  >
    <img
      alt="..."
      src={avatar}
      style={{
        width: "50px",
        marginRight: "15px"
      }}
    />
    <p>{children}</p>
  </div>
);

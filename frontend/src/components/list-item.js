import React from "react";
import avatar from "../boy.svg";

export const ListItem = ({ name, comment }) => (
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
    <div>
      <p>{name}</p>
      <label>{comment}</label>
    </div>
  </div>
);

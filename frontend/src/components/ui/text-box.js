import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "reactstrap";
import "../../css/paper-dashboard.css";

const Styled = styled.div`
  display: ${props => (props.hidden ? "none" : "block")};
  .comment-input {
    width: 85%;
    padding: 5px 5px;
  }
  .comment-btn {
    top: 9px;
    left: 5px;
  }
`;

export const TextBox = ({ placeholder, onClick, hidden }) => {
  const [reply, setReply] = useState("");
  return (
    <Styled hidden={hidden}>
      <Input
        type="text"
        className="comment-input"
        placeholder={placeholder}
        value={reply}
        onChange={e => setReply(e.target.value)}
      />
      <Button
        className="btn-round btn-icon comment-btn"
        color="primary"
        size="sm"
        onClick={() => {
          setReply("");
          return onClick(reply);
        }}
      >
        <i className="fa fa-send" />
      </Button>
    </Styled>
  );
};

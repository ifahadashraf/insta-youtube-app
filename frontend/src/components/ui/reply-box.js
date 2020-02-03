import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "reactstrap";
import "../../css/paper-dashboard.css";

const Styled = styled.div``;

export const ReplyBox = ({ placeholder, onClick }) => {
  const [reply, setReply] = useState("");
  return (
    <Styled>
      <Input
        type="text"
        placeholder={placeholder}
        value={reply}
        onChange={e => setReply(e.target.value)}
      />
      <Button
        className="btn-round btn-icon"
        color="primary"
        size="sm"
        onClick={() => onClick(reply)}
      >
        <i className="fa fa-send" />
      </Button>
    </Styled>
  );
};

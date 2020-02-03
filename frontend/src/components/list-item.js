import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../boy.svg";
import "../css/paper-dashboard.css";
import { Avatar } from "./ui/avatar";
import { Comment } from "./ui/comment";
import { TimeStamp } from "./ui/time-stamp";
import { Like } from "./ui/like";
import { ReplyBox } from "./ui/reply-box";
import { Label } from "reactstrap";

const Li = styled.li`
  display: flex;
  img {
    flex: 0.15;
  }
  .header {
    display: flex;
    flex: 0.7;
    p {
      margin: 0;
    }
  }
`;

export const ListItem = ({ name, comment, time }) => {
  const [state, setState] = useState({
    isLiked: false,
    isReplyOpen: false
  });

  return (
    <Li>
      <Avatar src={avatar} />
      <div>
        <div className="header">
          <p>{name}</p>
          <TimeStamp time={time} />
        </div>
        <Comment>{comment}</Comment>
        <Label onClick={() => setState({ ...state, isReplyOpen: true })}>
          Reply...
        </Label>
        <ReplyBox
          placeholder="Reply..."
          display={state.isReplyOpen}
          onClick={reply => console.log(reply)}
        />
      </div>
      <Like
        isLiked={state.isLiked}
        onClick={() =>
          setState({
            ...state,
            isLiked: !state.isLiked
          })
        }
      />
    </Li>
  );
};

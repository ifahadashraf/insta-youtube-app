import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../boy.svg";
import "../css/paper-dashboard.css";
import { Avatar } from "./ui/avatar";
import { Comment } from "./ui/comment";
import { TimeStamp } from "./ui/time-stamp";
import { Like } from "./ui/like";
import { ReplyBox } from "./ui/reply-box";
import { Label, Media } from "reactstrap";

const Li = styled.li`
  display: flex;
  margin-top:5px;
  img {
    flex: 0.35;
  }
  .media-section{
    width: 74%;
    padding: 0 10px;
    .comment{
      float: left;
      font-size: 14px;
      width: 100%;
      text-align: left;
      color: #000000;  
    }
    .reply{
      width: 100%;
      float: left;
      text-align: left;
      font-size: 10px;
    }
  }
  .header{
    width: 100%;
    float: left;
    p{
      margin: 0;
      span{
        float: left;
        color: #51cbce;
        font-weight: bold;
      }
      small{
        float: right;
      }
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
      <div className="media-section">
        <div className="header">
          <p><span>{name}</span> <small><TimeStamp time={time} /></small></p>
        </div>
        <Comment className="comment">{comment}</Comment>
        <Label onClick={() => setState({ ...state, isReplyOpen: true })} className="reply">
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

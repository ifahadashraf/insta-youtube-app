import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../boy.svg";
import "../css/paper-dashboard.css";
import { Avatar } from "./ui/avatar";
import { CommentText } from "./ui/comment-text";
import { TimeStamp } from "./ui/time-stamp";
import { Like } from "./ui/like";
import { TextBox } from "./ui/text-box";
import { Options } from "./ui/options";
import { Label } from "reactstrap";

const Li = styled.li`
  display: flex;
  margin-top: 5px;
  img {
    flex: 0.35;
  }
  .media-section {
    width: 74%;
    padding: 0 10px;
    .comment {
      float: left;
      font-size: 14px;
      width: 100%;
      text-align: left;
      color: #000000;
    }
    .reply {
      width: 100%;
      float: left;
      text-align: left;
      font-size: 10px;
    }
  }
  .header {
    width: 100%;
    float: left;
    p {
      margin: 0;
      span {
        float: left;
        color: #51cbce;
        font-weight: bold;
      }
      small {
        float: right;
      }
    }
  }
`;

export const Comment = ({ name, comment, time }) => {
  const [state, setState] = useState({
    isLiked: false,
    isReplyHidden: true,
    replies: []
  });
  return (
    <>
      <Li>
        <Avatar src={avatar} />
        <div className="media-section">
          <div className="header">
            <p>
              <span>{name}</span>{" "}
              <small>
                <TimeStamp time={time} />
              </small>
            </p>
          </div>
          <CommentText className="comment">{comment}</CommentText>
          <Label
            onClick={() => setState({ ...state, isReplyHidden: false })}
            className="reply"
          >
            Reply...
          </Label>
          <TextBox
            hidden={state.isReplyHidden}
            placeholder="Reply..."
            onClick={reply =>
              setState({
                ...state,
                replies: [...state.replies, reply]
              })
            }
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
        <Options />
      </Li>
      <ul>
        {state.replies.map(reply => (
          <Li>
            <Avatar src={avatar} />
            <div className="media-section">
              <div className="header">
                <p>
                  <span>{name}</span>{" "}
                  <small>
                    <TimeStamp time={new Date().getTime()} />
                  </small>
                </p>
              </div>
              <CommentText className="comment">{reply}</CommentText>
            </div>
          </Li>
        ))}
      </ul>
    </>
  );
};

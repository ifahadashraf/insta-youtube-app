import React from "react";
import ReactTimeAgo from "react-time-ago";
import styled from "styled-components";

const Styled = styled.div``;

export const TimeStamp = ({ time }) => (
  <Styled>
    <ReactTimeAgo date={new Date(time)} locale="en-US" />
  </Styled>
);

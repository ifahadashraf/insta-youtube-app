import React from "react";
import { Button } from "reactstrap";
import "../../css/paper-dashboard.css";

export const Like = ({ isLiked, ...rest }) => (
  <Button
    className="btn-round btn-icon"
    color="danger"
    size="sm"
    outline={!isLiked}
    {...rest}
  >
    <i className="fa fa-heart" />
  </Button>
);

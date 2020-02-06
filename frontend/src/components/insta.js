import React, { useState } from "react";
import InstagramEmbed from "react-instagram-embed";
import { TextBox } from "./ui/text-box";
import { Comment } from "./comment";
import "../../src/App.css";
import "../css/paper-dashboard.css";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

export const Insta = ({ data }) => {
  const [comments, setComments] = useState({});

  return (
    <Row>
      {data.data && data.data.length
        ? data.data.map(item => {
            if (item.node.__typename === "GraphImage") {
              return (
                <Col md="6">
                  <Card
                    className="card-user"
                    style={{
                      display: "inline-block"
                    }}
                  >
                    <CardBody
                      style={{
                        width: "400px"
                      }}
                    >
                      <InstagramEmbed
                        url={`https://instagr.am/p/${item.node.shortcode}/`}
                        maxWidth={400}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=""
                        injectScript
                      />
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <ul>
                        {comments[item.node.taken_at_timestamp] &&
                          comments[item.node.taken_at_timestamp].map(val => (
                            <Comment
                              name="John Doe"
                              comment={val}
                              time={new Date().getTime()}
                            />
                          ))}
                      </ul>
                      <TextBox
                        placeholder="Comment here..."
                        onClick={text => {
                          const stateToSave = {
                            ...comments
                          };
                          if (comments[item.node.taken_at_timestamp]) {
                            stateToSave[item.node.taken_at_timestamp].push(
                              text
                            );
                          } else {
                            stateToSave[item.node.taken_at_timestamp] = [text];
                          }
                          setComments(stateToSave);
                        }}
                      />
                    </CardFooter>
                  </Card>
                </Col>
              );
            }
          })
        : "No data available"}
    </Row>
  );
};

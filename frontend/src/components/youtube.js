import React, { useState } from "react";
import YouTube from "react-youtube";
import { TextBox } from "./ui/text-box";
import { Comment } from "./comment";
import "../../src/App.css";
import "../css/paper-dashboard.css";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

export const YoutubeEmbed = ({ data }) => {
  const [comments, setComments] = useState({});

  return (
    <Row>
      {data && data.length
        ? data.map(item => {
            if (item.kind === "youtube#video") {
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
                      <YouTube
                        videoId={item.link.split("=")[1]}
                        opts={{
                          height: "390",
                          width: "400"
                        }}
                      />
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <ul>
                        {comments[item.id] &&
                          comments[item.id].map(val => (
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
                          if (comments[item.id]) {
                            stateToSave[item.id].push(text);
                          } else {
                            stateToSave[item.id] = [text];
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

import React, { useEffect, useState } from "react";
import "./App.css";
import "./css/paper-dashboard.css";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Nav
} from "reactstrap";

function App() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState({});
  const [comment, setComment] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [comments, setComments] = useState({});

  return (
    <div className="App">
      <>
        <div className="content">
          <Card
            style={{
              padding: "10px"
            }}
          >
            <CardHeader>
              <Input
                type="text"
                onChange={e => setUsername(e.target.value)}
                style={{
                  padding: "10px",
                  width: "300px",
                  marginRight: "15px"
                }}
              />
              <Button
                className="btn-round"
                color="primary"
                onClick={() => {
                  setIsSearching(true);
                  fetch("http://localhost:5000/users/" + username).then(
                    resp => {
                      setIsSearching(false);
                      resp.json().then(result => setData(result));
                    }
                  );
                }}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </CardHeader>
          </Card>
          <Row>
            {data.data && data.data.length
              ? data.data.map(item => {
                  // setComments({
                  //   ...comments,
                  //   [item.node.taken_at_timestamp]: []
                  // });
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
                            <div className="image">
                              <img alt="..." src={item.node.display_url} />
                            </div>
                            <div>
                              <Button
                                className="btn-round"
                                color="primary"
                                outline
                              >
                                <i className="fa fa-heart" />
                                {item.node.edge_liked_by.count}
                              </Button>
                              <Button
                                className="btn-round"
                                color="primary"
                                outline
                              >
                                <i className="fa fa-comment" />
                                {item.node.edge_media_to_comment.count}
                              </Button>
                            </div>
                            <p className="description text-center">
                              {
                                item.node.edge_media_to_caption.edges[0].node
                                  .text
                              }
                            </p>
                          </CardBody>
                          <CardFooter>
                            <hr />
                            <ul
                              style={{
                                listStyle: "none",
                                textAlign: "left"
                              }}
                            >
                              {comments[item.node.taken_at_timestamp] &&
                                comments[item.node.taken_at_timestamp].map(
                                  val => (
                                    <li>
                                      <p>{val}</p>
                                    </li>
                                  )
                                )}
                            </ul>
                            <div
                              style={{
                                display: "inline-flex",
                                paddingBottom: "10px"
                              }}
                            >
                              <Input
                                type="text"
                                placeholder="Wirte something..."
                                style={{
                                  marginRight: "15px",
                                  width: "340px"
                                }}
                                onChange={e => setComment(e.target.value)}
                                value={comment}
                              />
                              <Button
                                className="btn-round btn-icon"
                                color="primary"
                                onClick={() => {
                                  const stateToSave = {
                                    ...comments
                                  };
                                  if (comments[item.node.taken_at_timestamp]) {
                                    stateToSave[
                                      item.node.taken_at_timestamp
                                    ].push(comment);
                                  } else {
                                    stateToSave[
                                      item.node.taken_at_timestamp
                                    ] = [comment];
                                  }

                                  setComment("");
                                  setComments(stateToSave);
                                }}
                              >
                                <i className="fa fa-send" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </Col>
                    );
                  }
                })
              : "No data available"}
          </Row>
        </div>
      </>
    </div>
  );
}

export default App;

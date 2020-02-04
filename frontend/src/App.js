import React, { useEffect, useState } from "react";
import InstagramEmbed from "react-instagram-embed";
import { Comment } from "./components/comment";
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
  Nav,
  Container
} from "reactstrap";
import { TextBox } from "./components/ui/text-box";

function App() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState({});
  const [comment, setComment] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [comments, setComments] = useState({});

  return (
    <div className="App">
      <Container>
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
                                comments[
                                  item.node.taken_at_timestamp
                                ].map(val => (
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
                                  stateToSave[
                                    item.node.taken_at_timestamp
                                  ].push(text);
                                } else {
                                  stateToSave[item.node.taken_at_timestamp] = [
                                    text
                                  ];
                                }
                                setComment("");
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
        </div>
      </Container>
    </div>
  );
}

export default App;

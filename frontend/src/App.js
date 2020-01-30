import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
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
  Col
} from "reactstrap";

function App() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState({});

  return (
    <div className="App">
      <>
        <div className="content">
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <button
            onClick={() => {
              fetch("http://localhost:5000/users/" + username).then(resp =>
                resp.json().then(result => setData(result))
              );
            }}
          >
            Search
          </button>
          <Row>
            {data.data &&
              data.data.map(item => {
                if (item.node.__typename === "GraphImage") {
                  return (
                    <Col sm="2">
                      <Card
                        className="card-user"
                        style={{
                          display: "inline-block"
                        }}
                      >
                        <CardBody>
                          <div className="image">
                            <img alt="..." src={item.node.display_url} />
                          </div>
                          <div>
                            <Button>
                              {item.node.edge_liked_by.count} Like
                            </Button>
                            <Button>
                              {item.node.edge_media_to_comment.count} Comment
                            </Button>
                          </div>
                          <p className="description text-center">
                            {item.node.edge_media_to_caption.edges[0].node.text}
                          </p>
                        </CardBody>
                        <CardFooter>
                          <Input type="text" placeholder="Wirte something..." />
                          <Button>Send</Button>
                        </CardFooter>
                      </Card>
                    </Col>
                  );
                }
              })}
          </Row>
        </div>
      </>
      );
    </div>
  );
}

export default App;

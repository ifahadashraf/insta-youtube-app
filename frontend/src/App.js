import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./css/paper-dashboard.css";
// reactstrap components
import { Button, Card, CardHeader, Input, Container } from "reactstrap";
import { Insta } from "./components/insta";
import { YoutubeEmbed } from "./components/youtube";

const Tabs = styled.div`
  margin-bottom: 20px;
  a {
    padding: 10px 20px 10px 20px;
    margin: 10px;
    background: #51cbce;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
`;
function App() {
  const [data, setData] = useState({});
  const [username, setUsername] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  return (
    <Router>
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
                    window.location.pathname === "/"
                      ? fetch(
                          "http://localhost:5000/users/instagram/" + username
                        ).then(resp => {
                          setIsSearching(false);
                          resp.json().then(result => setData(result));
                        })
                      : fetch(
                          "http://localhost:5000/users/youtube/" + username
                        ).then(resp => {
                          setIsSearching(false);
                          resp.json().then(result => setData(result));
                        });
                  }}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </CardHeader>
            </Card>
            <Tabs>
              <Link to="/">Instagram</Link>
              <Link to="/youtube">Youtube</Link>
            </Tabs>

            <Switch>
              <Route path="/" exact>
                <Insta data={data} />
              </Route>
              <Route path="/youtube">
                <YoutubeEmbed data={data} />
              </Route>
            </Switch>
          </div>
        </Container>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import DevToolsWrapper from "./components/DevToolsWrapper";

const App = () => (
  <DevToolsWrapper>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/create" component={CreatePage} />
      <Route exact={true} path="/:id" component={CharacterPage} />
    </Switch>
  </DevToolsWrapper>
);

export default App;

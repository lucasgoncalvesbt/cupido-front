import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Mensagens from "./containers/Mensagens";
import NewNote from "./containers/NewNote";
import Instrucoes from "./containers/Instrucoes";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/instrucoes">
                <Instrucoes />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/mensagens/new">
                <NewNote />
            </Route>
            <Route exact path="/mensagens/:id">
                <Mensagens />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
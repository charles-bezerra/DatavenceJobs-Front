import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from './services/api';
import JobView from './views/job';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props => (
            isAuthenticated() ?
            ( <Redirect to={{ pathname: '/admin', state: { from: props.location} }} /> ) :
            ( <Component {...props} /> )
        )}
    />
);

const AdminRoute = ({ component: Component, ...rest}) => (
    <Route 
        {...rest} 
        render={ props => (
            isAuthenticated() ? 
            ( <Component {...props} /> ) : 
            ( <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> )
        )}
    />
);


export default function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <Redirect to={{ pathname: "/jobs" }}/>} />
                <Route path="/jobs" exact component={() => (<h1>Index</h1>) }/>
                <Route path="/job/:id" exact component={ () => <JobView /> }/>
            </Switch>
        </BrowserRouter>
    );
}
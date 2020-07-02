import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from './services/auth';
//Candidates
import JobView from './views/job';
import JobsView from './views/jobs';
//Auth
import LoginView from './views/auth/login';
import RegisterView from './views/auth/register';
//Admin
import HomeView from './views/admin/home';


const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props => (
            isAuthenticated() ?
            ( <Redirect to={{ pathname: '/home', state: { from: props.location} }} /> ) :
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
                <Route path="/jobs" exact component={() => <JobsView /> }/>
                <Route path="/job/:id" exact component={ () => <JobView /> }/>
                
                <AuthRoute path="/login" exact component={ () => <LoginView/> } />
                <AuthRoute path="/register" exact component={ () => <RegisterView/> } />
                
                <AdminRoute path="/home" exact component={ () => <HomeView/> } />
            </Switch>
        </BrowserRouter>
    );
}
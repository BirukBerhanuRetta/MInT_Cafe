import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
//import './App.css';
import Login from './Login';
import isAuthenticatd from './Login';
import Inventory from './Inventory';

function App() {
    return (
        <div className="container">
            <h2>MINT CAFE</h2>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/inventory" component={Inventory} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        </div>
    );
}

// PrivateRoute component for protecting routes
const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = isAuthenticatd;
    console.log(isAuthenticated);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default App;

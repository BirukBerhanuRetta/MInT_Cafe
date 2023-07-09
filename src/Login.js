import React, { useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import axios from "axios";
import "./Login.css"
const bcrypt = require('bcryptjs');
var isAuthenticatd = false;
const saltRounds=10;
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) return;

// Encryption of the string password


        try {
            //use this for when signing up
            const hshdpswd = await bcrypt.hash(password,saltRounds)

            await axios.post(' http://localhost:3001/users', {
                user_id: username,
                hashedpswd: password
            });
            //console.log(hshdpswd);
            setUsername('');
            setPassword('');
            isAuthenticatd= true;
            //console.log(isAuthenticatd);

            //history.push('/inventory')
        } catch (error ) {
            if (error.code == 401){

                console.error("password doesn't match", error)
            }
            else {
                console.error('Error loging in:', error);
            }
            setUsername('');
            setPassword('');
            isAuthenticatd= false;
        }
        // Perform login authentication
        // You can customize this part based on your authentication mechanism
        //console.log('Perform login authentication');

        // After successful login, navigate to the inventory page, menu page or whatever depending on the user type

        //history.push('/inventory');
    };
    if (isAuthenticatd){
        return <Redirect to="/Inventory"/>;
    }
    return (
        <div className="login-form">
            <h3>Login</h3>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

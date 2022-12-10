import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { margin } from '@mui/system';
import Header from './Header';
import { useState } from 'react';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoute'
import { useNavigate } from 'react-router-dom'

export default function BasicTextFields() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = await axios.put(loginRoute, {
            email,
            password
        })
        console.log(data.data);
        if (data.data.user) {
            localStorage.setItem('token', data.data.user);
            localStorage.setItem('profile', data.data.profile);
            alert('Login SuccessFull');
            navigate('/dashboard')
        }
        else {
            alert('Please check your username and password')
        }
    }

    // Styling
    const styles = {
        main: {
            width: "600px",
            margin: "0 auto"
        }
    };
    // Styling

    return (
        <>
            <Header />
            <div className="main" style={styles.main}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
                    <input type="submit" placeholder="Submit"></input>
                </form>
            </div>
        </>
    );
}
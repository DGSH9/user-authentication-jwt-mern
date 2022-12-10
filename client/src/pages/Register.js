import { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoute';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async (event) => {
        event.preventDefault();
        const response = await axios.post(registerRoute, {
            name,
            email,
            password
        })
        // console.log(response.data);
        if (response.data.status === 'ok') {
            navigate('/login');
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

                <h1>Register</h1>
                <form onSubmit={register}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input> <br />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
                    <input type="submit" placeholder="Submit"></input>
                </form>
            </div>
        </>
    );
}

export default Register;

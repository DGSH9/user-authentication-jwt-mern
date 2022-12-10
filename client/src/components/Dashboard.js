import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'
import HeaderForDashBoard from './HeaderForDashBoard';

function Dashboard() {
    const navigate = useNavigate();
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate("/login");
        }
        else {
            populateQuote();
        }
    }, [])

    const populateQuote = async () => {
        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await req.json();
        if (data.status === 'ok') {
            setQuote(data.quote)
            console.log(data.quote);
        }
        else {
            alert(data.error)
        }
    }


    const updateQuote = async (event) => {
        event.preventDefault()
        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })
        const data = await req.json();
        if (data.status === 'ok') {
            setQuote(tempQuote)
            setTempQuote('')
        }
    }

    return (
        <div>
            <HeaderForDashBoard />
            <div className='container'>
                <form onSubmit={updateQuote}>
                    <input
                        type='text'
                        placeholder='Quote'
                        value={tempQuote}
                        onChange={(e) => setTempQuote(e.target.value)}
                    ></input>

                    <input type='submit' value='Update Quote'>
                    </input>
                </form>
                <h1>{quote}</h1>
            </div>
        </div>
    )
}

export default Dashboard
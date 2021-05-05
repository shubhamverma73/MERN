import React, { useEffect, useContext } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import { userContext } from './../App';

const Logout = () => {
    let history = useHistory();

    const {state, dispatch} = useContext(userContext);

    const logoutData = async () => {
        let result = await fetch("/logout", {
            method: "GET",
            headers: {'Content-Type' : 'application/json'},
        });
        result = await result.json();
        if(result.status === 200) {
            alert('You are successfully logout.');
            dispatch({ type: 'USER', payload: false });
            history.push('/');
        } else {
            alert('Not able to logout, try again');
        }
    }

    useEffect(() => {
        logoutData();
    }, []);

    return (
        <>
            <Redirect to='/' />
        </>
    );
}
export default Logout;
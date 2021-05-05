import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { userContext } from './../App';

const Login = () => {
    document.title = 'Login';

    const {state, dispatch} = useContext(userContext);
    
    let history = useHistory();
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    const onSubmit = async (data) => {
        let items = {...data};
        const formData = JSON.stringify(items);
        let result = await fetch("/login", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: formData
        });
        result = await result.json();
        if(result.status === 200) {
            dispatch({ type: 'USER', payload: true });
            history.push('/');
        } else {
            setshowMessage('');
            setmessageType('danger');
            setMessage(result.message);
        }
    }

    return (
        <>
            <section id="cover_login" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-6 login-form-2" style={{float:"none", margin:"auto"}}>
                                {
                                    (showMessage !== 'hide') ? 
                                    <div className={`alert alert-${messageType} ${showMessage}`} role="alert">
                                        {message}
                                    </div>
                                    : ''
                                }
                                <h3>Login</h3>
                                <form method="POST" action="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group input-container">
                                        <i className="fa fa-user icon"></i>
                                        <input type="text" className="form-control input-field" placeholder="Your Email *" name="email" {...register('email', { required: true })} required />
                                    </div>
                                    <div className="form-group input-container">
                                        <i className="fa fa-envelope icon"></i>
                                        <input type="password" className="form-control input-field" placeholder="Your Password *" name="password" {...register('password', { required: true })} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btnSubmit" value="Login" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
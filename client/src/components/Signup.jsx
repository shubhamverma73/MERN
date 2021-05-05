import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Signup = () => {

    document.title = 'Registration';

    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    const onSubmit = async (data) => {
        let items = {...data};
        const formData = JSON.stringify(items);
        let result = await fetch("/register", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: formData
        });
        result = await result.json();
        if(result.status === 200) {
            setshowMessage('');
            setmessageType('success');
            setMessage(result.message);
        } else {
            setshowMessage('');
            setmessageType('danger');
            setMessage(result.message);
        }
    }

    return (
        <>
            <section id="cover_register" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container register">
                        <div className="row">
                            <div className="col-md-3 register-left">
                                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                                <h3>Welcome</h3>
                                <p>You are 30 seconds away from earning your own money!</p><br/>
                            </div>
                            <div className="col-md-9 register-right">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        {
                                            (showMessage !== 'hide') ? 
                                            <div className={`alert alert-${messageType} ${showMessage}`} role="alert">
                                                {message}
                                            </div>
                                            : ''
                                        } 
                                        <h3 className="register-heading">Registration</h3>
                                        <form method="POST" action="" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="row register-form">
                                                <div className="col-md-6">
                                                    <div className="form-group input-container">
                                                        <i className="fa fa-user icon"></i>
                                                        <input type="text" className="form-control input-field" placeholder="Name *" {...register('name', { required: true })} required />
                                                    </div>
                                                    <div className="form-group input-container">
                                                        <i className="fa fa-envelope icon"></i>
                                                        <input type="email" className="form-control input-field" placeholder="Email *" {...register('email')} required />
                                                    </div>
                                                    <div className="form-group input-container">
                                                        <i className="fa fa-key icon"></i>
                                                        <input type="password" className="form-control input-field" placeholder="Password *" {...register('password')} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group input-container">
                                                        <i className="fa fa-phone icon"></i>
                                                        <input type="text" className="form-control input-field" minLength="10" maxLength="10" placeholder="Phone *"  {...register('phone')} required />
                                                    </div>
                                                    <div className="form-group input-container">
                                                        <i className="fa fa-map-marker icon"></i>
                                                        <input type="text" className="form-control input-field" placeholder="Address *" {...register('address')} required />
                                                    </div>
                                                    <input type="submit" className="btnRegister input-field"  value="Register"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            
        </>
    );
}

export default Signup;
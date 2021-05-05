import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {

    document.title = 'Contact us';

    
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[sbumitButton, setsbumitButton] = useState('submit');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();
    const[userData, setUserData] = useState({
        name: "",      
        email: "",
        subject: "",
        message: "",
    });

    const contactPage = async () => {
        let result = await fetch("/getUserData", {
            method: "GET",
            headers: {'Content-Type' : 'application/json'},
        });
        result = await result.json();
        if(result.status === 200) {
            setUserData(result.data);
        }
    }

    useEffect(() => {
        contactPage();
    }, []);

    // =================== After form submit =====================
    const onSubmit = async (data) => {
        let items = {...data};
        const formData = JSON.stringify(items);
        setsbumitButton('Please wait ...');
        let result = await fetch("/contact", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: formData
        });
        result = await result.json();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        if(result.status === 200) {
            setshowMessage('');
            setmessageType('success');
            setMessage(result.message);
            setTimeout(()=>{
                window.location.reload(false);
            }, 5000);
        } else {
            setshowMessage('');
            setmessageType('danger');
            setMessage(result.message);
        }
    }

    return (
        <>            
            <section id="cover_contact" className="min-vh-100">
                <div id="cover-caption">
                    {
                        (showMessage !== 'hide') ? 
                        <div className={`alert alert-${messageType} ${showMessage}`} role="alert">
                            {message}
                        </div>
                        : ''
                    } 

                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-6 login-form-2">
                                <div style={{paddingTop: "110px", color: "white", fontSize: "25px"}}>
                                    <p>
                                    <i className="fa fa-map-marker" style={{color:"white", textAlign: "center"}}></i> 
                                        &nbsp;&nbsp;Plot No.22, Sector 12B,
                                        <br/>Opp. Bal Bhawan School,
                                        <br/>Dwarka,
                                        New Delhi - 110078
                                    </p>
                                    <p>
                                    <i className="fa fa-phone" style={{color:"white", textAlign: "center"}}></i>
                                    &nbsp;&nbsp;+91 8800 321689
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 login-form-2">
                                <h3>Contact Us</h3>
                                <form method="POST" action="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group input-container">
                                        <i className="fa fa-user icon"></i>
                                        <input type="text" className="form-control input-field" placeholder="Your Name *" name="name" defaultValue={userData.name} {...register('name', { required: true })} required />
                                    </div>
                                    <div className="form-group input-container">
                                        <i className="fa fa-envelope icon"></i>
                                        <input type="text" className="form-control input-field" placeholder="Your Email *" name="email" defaultValue={userData.email} {...register('email', { required: true })} required />
                                    </div>
                                    <div className="form-group input-container">
                                        <i className="fa fa-file icon"></i>
                                        <input type="text" className="form-control input-field" placeholder="Subject *" name="subject" {...register('subject', { required: true })} required />
                                    </div>
                                    <div className="form-group input-container">
                                        <i className="fa fa-commenting icon"></i>
                                        <textarea className="form-control input-field" placeholder="Message *" name="message" {...register('message', { required: true })} required ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btnSubmit" value={sbumitButton} />
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

export default Contact;
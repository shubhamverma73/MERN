import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import me from '../../assets/img/me.jpg';

const Profile = () => {

    document.title = 'Profile';
    let history = useHistory();
    const [userData, setUserData] = useState({
        id: "",      
        name: "",      
        email: "",
        phone: "",
        address: "",
        date: "",
    });
    
    const profilePage = async () => {
        let result = await fetch("/profile", {
            method: "GET",
            headers: {Accept : 'application/json', 'Content-Type' : 'application/json'},
            credentials: 'include',
            withCredentials: true,
        });
        result = await result.json();
        if(result.status !== 200) {
            history.push('/login');
        } else {
            setUserData(result.data);
        }
    }

    useEffect(() => {
        profilePage();
    }, []);

    return (
        <>
            <section id="cover_profile" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-12 login-form-2">
                                <h3>Profile</h3>
                                <form method="post">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="profile-img">
                                                <img src={me} alt=""/>
                                                <div className="file btn btn-lg btn-primary">
                                                    Change Photo
                                                    <input type="file" name="file"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="profile-head">
                                                <h5>{userData.name}</h5>
                                                <h6>Web Developer</h6>
                                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="submit" className="btn btn-success" name="btnAddMore" value="Edit Profile"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="profile-work profile-text-align">
                                                <p>WORK LINK</p>
                                                <a href="http://shubhamvermamca.blogspot.com/">Website Link</a><br/>
                                                <p>SKILLS</p>
                                                <a href="https://php.net">PHP</a><br/>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="tab-content profile-tab" id="myTabContent">
                                                <div className="tab-pane fade show active profile-text-align" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>User Id</label></div>
                                                        <div className="col-md-6"><p>{userData.id}</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Name</label></div>
                                                        <div className="col-md-6"><p>{userData.name}</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Email</label></div>
                                                        <div className="col-md-6"><p>{userData.email}</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Phone</label></div>
                                                        <div className="col-md-6"><p>+91-{userData.phone}</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Address</label></div>
                                                        <div className="col-md-6"><p>+91-{userData.address}</p></div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade profile-text-align" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Experience</label></div>
                                                        <div className="col-md-6"><p>Expert</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Hourly Rate</label></div>
                                                        <div className="col-md-6"><p>800<i className="fa fa-inr" aria-hidden="true"></i> /hr</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Total Projects</label></div>
                                                        <div className="col-md-6"><p>45</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Profession</label></div>
                                                        <div className="col-md-6"><p>Web Developer</p></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 profile-lable"><label>Availability</label></div>
                                                        <div className="col-md-6"><p>18 months</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Profile;
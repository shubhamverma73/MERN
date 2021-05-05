import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { userContext } from './../../App';

const Navigation = () => {

	const {state, dispatch} = useContext(userContext);

	return (    
        <>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<a className="navbar-brand" href={process.env.PUBLIC_URL}><img src={logo} height="35px" alt="logo" /></a>

				<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
					<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/">Home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/about">About</NavLink>
						</li>

						{
							(state) ?
							<>
								<li className="nav-item">
									<NavLink className="nav-link" exact to="/logout">Logout</NavLink>
								</li>								
							</>
							:
							<>
								<li className="nav-item">
									<NavLink className="nav-link" exact to="/login">Login</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" exact to="/signup">Register</NavLink>
								</li>
							</>
						}
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/profile">Profile</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" exact to="/contact">Contact</NavLink>
						</li>
					</ul>
				</div>
			</nav>
        </>
    );
}

export default Navigation;
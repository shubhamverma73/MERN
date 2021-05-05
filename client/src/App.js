import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css';
import React, { createContext, useReducer } from 'react';
import { Route, Switch } from "react-router-dom";
//import Header from './components/layout/Header';
import Navbar from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Profile from './components/pages/Profile';
import NotFound from './components/pages/NotFound';
import { reducer, initialState } from './reducer/UseReduer';

export const userContext = createContext();

function App() {

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
		<userContext.Provider value={{state, dispatch}}>
				{/* <Header /> */}
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/profile" component={Profile} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
		</userContext.Provider>
		</>
	);
}

export default App;
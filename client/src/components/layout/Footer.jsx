import React from "react";

const Footer = () => {
	return (
			<>
			<footer className="page-footer font-small special-color-dark pt-4 bottom-footer">
				<a href="https://facebook.com" className="btn-floating btn-fb mx-1" target="_blank" rel="noreferrer" style={{fontSize: "20px"}}><i className="fa fa-facebook-square"></i></a>
				<a href="https://google.com" className="btn-floating btn-fb mx-1" target="_blank" rel="noreferrer" style={{fontSize: "20px"}}><i className="fa fa-google"></i></a>
				<a href="https://linkedin.com" className="btn-floating btn-fb mx-1" target="_blank" rel="noreferrer" style={{fontSize: "20px"}}><i className="fa fa-linkedin"></i></a>
				<a href="https://twitter.com" className="btn-floating btn-fb mx-1" target="_blank" rel="noreferrer" style={{fontSize: "20px"}}><i className="fa fa-twitter"></i></a>
				<a href="https://instagram.com" className="btn-floating btn-fb mx-1" target="_blank" rel="noreferrer" style={{fontSize: "20px"}}><i className="fa fa-instagram"></i></a>
				<div className="footer-copyright text-center py-3 bottom-footer" style={{marginTop: "-10px"}}>© 2020 Copyright:
					<a href="http://shubhamvermamca.blogspot.com/"> Shubham Verma</a>
				</div>
			</footer>
			</>
	);
}
export default Footer;
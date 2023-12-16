import React from "react";
import "./Footer.css";
import logo from "../../images/gymLogo.png";

const Footer = () => {
	return (
		<footer class="footer-distributed">
			<div class="footer-left">
				<div className="h3Box">
					<div className="h3">Fitness Zone</div>

					<img src={logo} alt="" width="50px" />
				</div>

				<h4 class="footer-links">
					<a href="#" class="link-1">
						Home
					</a>

					<a href="#">Blog</a>

					<a href="#">Pricing</a>

					<a href="#">About</a>

					<a href="#">Faq</a>

					<a href="#">Contact</a>
				</h4>

				<h4 class="footer-company-name">Fitness Zone © 2021</h4>
			</div>

			<div class="footer-center">
				<div className="minibox">
					<a
						href="https://www.google.com/maps/dir/28.4532461,76.9988664/st+andrews+institute+of+technology+and+management+location/@28.4532282,76.9288261,12z/data=!3m1!4b1!4m6!4m5!1m1!4e1!1m2!1m1!1s0x390d6bb18c31279b:0x11d335a5bc228dd6"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="fa fa-map-marker"></i>
					</a>
					<h4>
						<span>Dronacharya College of Engineering</span> Gurugram, Haryana
					</h4>
				</div>

				<div className="minibox">
					<i class="fa fa-phone"></i>
					<h4>+19 7011112388</h4>
				</div>

				<div className="minibox">
					<a href="mailto:temp.sharma@gmail.com">
						<i class="fa fa-envelope"></i>
					</a>

					<h4>demo@company.com</h4>
				</div>
			</div>

			<div class="footer-right">
				<h4 class="footer-company-about">
					<span>About the company</span>
					We specialise in solving your problems, by designing and building
					intelligent, positive training environments and spaces for all users.
					we can help you make your gym
				</h4>

				<div class="footer-icons">
					<a href="#">
						<i class="fa fa-facebook"></i>
					</a>
					<a href="#">
						<i class="fa fa-twitter"></i>
					</a>
					<a
						href="https://www.linkedin.com/in/krishan-kant-15679021a/"
						target="_blank"
					>
						<i class="fa fa-linkedin"></i>
					</a>
					<a href="https://github.com/krishan-kant-57474" target="_blank">
						<i class="fa fa-github"></i>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

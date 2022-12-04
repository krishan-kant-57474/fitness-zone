import React, { Fragment, useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../../images/gymLogo.png";
import userLogo from "../../images/userLogo.png";
import { useNavigate } from "react-router-dom";
const Navbar = ({ userData, update }) => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [isTrue, setIsTrue] = useState(false);
	const userHomePage = async () => {
		try {
			const res = await fetch("/me", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
				},
			});

			const data = await res.json();
			console.log(data);
			console.log("inside of navbar");

			setUserName(data.name);
			userData(data);
		} catch (error) {
			userData({});
			setUserName("");
			console.log("give me big error");
			console.log(error);
		}
	};

	// if(logout){

	// }

	useEffect(() => {
		userHomePage();
	}, [update]);

	return (
		<Fragment>
			<div className={classes.navbar}>
				<div
					className={classes.username}
					onClick={() => {
						navigate("/");
					}}
				>
					<img src={logo} className={classes.logo} alt="logo" />
					<h4>FITNESS ZONE</h4>
				</div>
				<div className={classes.username}>
					<h4>{userName ? "Hii " + userName : ""}</h4>
					<ul
						onMouseOver={() => {
							setIsTrue((pre) => !pre);
						}}
						onMouseOut={() => {
							setIsTrue((pre) => !pre);
						}}
					>
						<li>
							<img src={userLogo} alt="" />
						</li>
						<li
							className={classes[`${isTrue ? "li-block" : "li-hide"}`]}
							onClick={() => {
								if (userName !== "") {
									navigate("/logout");
								} else {
									navigate("/login");
								}
							}}
						>
							{userName !== "" ? "Logout" : "Login"}
						</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default Navbar;

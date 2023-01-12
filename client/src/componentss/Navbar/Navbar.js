import React, { Fragment, useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../../images/gymLogo.png";
import userLogo from "../../images/userLogo.png";
import { useNavigate } from "react-router-dom";
const Navbar = ({ userData, setLoading }) => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [isTrue, setIsTrue] = useState(false);

	const userHomePage = async () => {
		setLoading(true);
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
		setLoading(false);
	};

	useEffect(() => {
		userHomePage();
	}, [localStorage.getItem("islogin")]);

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
					<h4>{userName ? "Hi " + userName : ""}</h4>
					<ul
						onMouseOver={() => {
							setIsTrue((pre) => !pre);
						}}
						onMouseOut={() => {
							setIsTrue((pre) => !pre);
						}}
					>
						<li>
							<img src={userLogo} alt="logo" />
						</li>

						<li
							className={classes["login"]}
							onClick={() => {
								if (userName !== "") {
									navigate("/logout");
								} else {
									navigate("/login");
								}
							}}
						>
							<h4>{userName !== "" ? "Logout" : "Login"}</h4>
						</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default Navbar;

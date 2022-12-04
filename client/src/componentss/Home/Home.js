import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import gymImg from "../../images/gym2.png";

const Home = ({ userInfo }) => {
	const navigate = useNavigate();
	return (
		<div className={classes["main-box"]}>
			<header className="header">
				<div className="container flex">
					<div className="text">
						<h1 className="mb">
							Complete Daily <br />
							<span>Workout</span> At Home
						</h1>

						<h4>
							Ability is what you’re capable of doing. Motivation determines
							what you do. Attitude determines how well you do it.
						</h4>

						<div
							onClick={() => {
								navigate("/login");
							}}
							className="btn mt"
						>
							Get Started Now
						</div>
					</div>

					<div className="visual">
						<img src={gymImg} alt="" />
					</div>
				</div>
			</header>
		</div>
	);
};

export default Home;

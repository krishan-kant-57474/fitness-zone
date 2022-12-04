import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Subscription.module.css";
import Chart from "../UI/Chart";

const About = () => {
	const navigate = useNavigate();

	return (
		<div className={classes["main-box"]}>
			<div className={classes["emp-profile"]}>
				<Chart />
			</div>
			<div
				className={classes.bt}
				onClick={() => {
					navigate("/");
				}}
			>
				Back
			</div>
		</div>
	);
};

export default About;

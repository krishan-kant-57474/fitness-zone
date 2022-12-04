import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import classes from "./About.module.css";
import img from "../../images/gymLogo.png";

const About = ({ userInfo }) => {
	const navigate = useNavigate();

	if (userInfo?.role !== "user") {
		navigate("/login");
	}
	return (
		<div className={classes["main-box"]}>
			<div className={classes["emp-profile"]}>
				<div className={classes.Box1}>
					<div>
						<img src={img} alt="" srcset="" />
					</div>
					<h1>{userInfo.name}</h1>
				</div>
				<div className={classes.Box2}>
					<div className={classes.detailsBox}>
						<div className={classes.details}>
							<h3 className={classes.h3}>Phone :</h3>
							<h3>{userInfo.phone}</h3>
						</div>
						<div className={classes.details}>
							<h3 className={classes.h3}>Gmail :</h3>
							<h3>{userInfo.email}</h3>
						</div>
					</div>
					<div className={classes.detailsBox}>
						<div className={classes.details}>
							<h3 className={classes.h3}>Subscription :</h3>
							<h3>{userInfo.subscription} Month</h3>
						</div>
						<div className={classes.details}>
							<h3 className={classes.h3}>Join Date :</h3>
							<h3>{userInfo.date?.slice(0, 10)}</h3>
						</div>
					</div>
				</div>
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

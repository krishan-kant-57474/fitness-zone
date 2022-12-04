import React, { useEffect, useState } from "react";
import classes from "./Details.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Details = ({ userInfo,setIsError }) => {
	const navigate = useNavigate();
	const state = useLocation();
	const [userData, setuserData] = useState("Members");

	useEffect(() => {
		if (state.state?.user) {
			setuserData(state.state?.user);
		}
	}, []);

	const modifyHandler = () => {
		setIsError({
			status: true,
			message: "Work is Going on. So Sorry",
		});

		navigate("/");
	};
	const subscriptionHandler = () => {
		navigate("/subscriptionDetails");
	};
	if (userInfo?.role !== "admin") {
		navigate("/login");
	}
	return (
		<div className={classes["main-box"]}>
			<div className={classes.heading}>
				<h3>{userData?.name ? userData?.name : "Members"}</h3>
			</div>
			<div className={classes.box}>
				<div className={classes["modify-details"]} onClick={modifyHandler}>
					<h3>Modify Details</h3>
				</div>
				<div
					className={classes["subscription-details"]}
					onClick={subscriptionHandler}
				>
					<h3>Subscription Details</h3>
				</div>
			</div>
			<button
				onClick={() => {
					navigate("/");
				}}
			>
				Go Back
			</button>
		</div>
	);
};

export default Details;

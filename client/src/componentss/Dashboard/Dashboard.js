import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";

const Dashboard = ({ userInfo }) => {
	const navigate = useNavigate();

	const membersHandler = () => {
		navigate("/members");
	};
	const newMamberHandler = () => {
		navigate("/newMember");
	};

	useEffect(() => {
		if (userInfo?.role !== "admin") {
			navigate("/login");
		}
	}, [userInfo]);

	return (
		<div className={classes["main-box"]}>
			<div className={classes.members} onClick={membersHandler}>
				<h3>Members</h3>
			</div>
			<div className={classes["new-member"]} onClick={newMamberHandler}>
				<h3>New Members</h3>
			</div>
		</div>
	);
};

export default Dashboard;

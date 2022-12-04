import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Errorpage.module.css";

const Errorpage = ({ setIsError }) => {
	const navigate = useNavigate();
	useEffect(() => {
		setIsError({
			status: true,
			message: "we are sorry , page not found!",
		});
		navigate("/");
	}, []);

	return (
		<>
			<div className={classes.notFound}></div>
		</>
	);
};

export default Errorpage;

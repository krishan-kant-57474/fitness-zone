import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={classes["loaderbox"]}>
			<span class={classes["loader"]}></span>
		</div>
	);
};

export default Loader;

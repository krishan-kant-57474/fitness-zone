import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import classes from "./Error.module.css";

const Error = ({ onHideCart, message }) => {
	const buttonRef = useRef(null);

	useEffect(() => {
		buttonRef.current.focus();
	}, []);
	return (
		<Modal onHideCart={onHideCart}>
			<div className={classes.box}>
				<h3 className={classes.message}>{message}</h3>
				<div className={classes.actions}>
					<button
						className={classes["button--alt"]}
						onClick={onHideCart}
						ref={buttonRef}
					>
						Close
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default Error;

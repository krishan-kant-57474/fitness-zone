import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUpdate }) => {
	const navigate = useNavigate();
	//promises
	useEffect(() => {
		fetch("/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				setUpdate((pre) => !pre);
				navigate("/login", { replace: true });
				if (res.status != 200) {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return (
		<>
			<h1> Logout ka page</h1>
		</>
	);
};

export default Logout;

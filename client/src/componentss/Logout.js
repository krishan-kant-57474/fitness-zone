import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Ui/Loader";

const Logout = () => {
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
				if (res.status != 200) {
					const error = new Error(res.error);
					throw error;
				}
				localStorage.setItem("islogin", false);
				navigate("/login", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <Loader />;
};

export default Logout;

import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Loader from "../../Ui/Loader";

const Login = ({ setIsError, userInfo }) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const nameHandler = (event) => {
		setName(event.target.value);
	};
	console.log(name);
	const passwordHandler = (event) => {
		setPassword(event.target.value);
	};

	const formData = async (event) => {
		event.preventDefault();
		setLoading(true);
		if (name === "" || password === "") {
			setLoading(false);
			return;
		}
		const res = await fetch("/signin", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name,
				password,
			}),
		});
		console.log(res);
		const data = await res.json();

		if (res.status === 400 || !data) {
			setIsError({
				status: true,
				message: data.message,
			});
		} else {
			localStorage.setItem("islogin", true);
			setName("");
			setPassword("");
			setIsError({
				status: true,
				message: data.message,
			});

			if (data?.role === "admin") {
				navigate("/dashboard");
			} else {
				navigate("/aboutus");
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		console.log("userinfo-useEffect");
		if (userInfo.role === "admin") {
			navigate("/dashboard");
		}
		if (userInfo.role === "user") {
			navigate("/aboutus");
		}
	}, [userInfo]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className={classes["main-box"]}>
					<form className={classes["form-box"]} onSubmit={formData}>
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={nameHandler}
							value={name}
						/>
						<div>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={passwordHandler}
								value={password}
							/>
							<p
								className={classes.forget}
								onClick={() => {
									setIsError({
										status: true,
										message: "Work is Going on. So Sorry",
									});
								}}
							>
								forget password?
							</p>
						</div>
						<button>Login</button>
					</form>
				</div>
			)}
		</Fragment>
	);
};

export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = ({ setUpdate, setIsError, userInfo }) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const nameHandler = (event) => {
		setName(event.target.value);
	};
	console.log(name);
	const passwordHandler = (event) => {
		setPassword(event.target.value);
	};
	const formData = async (event) => {
		event.preventDefault();
		if (name === "" || !password === "") {
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
			setUpdate((pre) => !pre);

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
	};

	useEffect(() => {
		if (userInfo.role === "admin") {
			navigate("/dashboard");
		}
		if (userInfo.role === "user") {
			navigate("/aboutus");
		}
	}, [userInfo]);

	return (
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
					<p className={classes.forget}
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
	);
};

export default Login;

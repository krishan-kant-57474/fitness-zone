import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Singup.module.css";
import Loader from "../../Ui/Loader";

const Signup = ({ userInfo, setIsError }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		subscription: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	let name, value;

	const handleInputes = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};

	const postData = async (e) => {
		e.preventDefault();

		setLoading(true);

		const { name, email, phone, subscription, password } = user;
		if (
			name === "" ||
			email === "" ||
			phone === "" ||
			subscription === "" ||
			password === ""
		) {
			setLoading(false);
			return;
		}

		const res = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				phone,
				subscription,
				password,
			}),
		});
		const data = await res.json();
		if (res.status === 422 || !data) {
			// window.alert("invalid registratiion");
			console.log(data, "🚲🚲");
			setIsError({
				status: true,
				message: data.message,
			});
			console.log("invalid registratiion");
		} else {
			// window.alert("successfull registratiion");
			setIsError({
				status: true,
				message: "successfull registratiion",
			});
			navigate("/login");
			setUser({
				name: "",
				email: "",
				phone: "",
				subscription: "",
				password: "",
			});
		}
		setLoading(false);
	};

	if (userInfo?.role !== "admin") {
		navigate("/login");
	}

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className={classes["main-box"]}>
					<form className={classes["form-box"]} onSubmit={postData}>
						<h2 className={classes["form-title"]}>Sign up</h2>
						<input
							type="text"
							name="name"
							id="name"
							autoComplete="off"
							placeholder="Name"
							value={user.name}
							onChange={handleInputes}
							required
						/>

						<input
							type="text"
							name="email"
							id="email"
							autoComplete="off"
							placeholder="Email"
							value={user.email}
							onChange={handleInputes}
							required
						/>

						<input
							type="text"
							name="phone"
							id="phone"
							autoComplete="off"
							placeholder="Phone"
							value={user.phone}
							onChange={handleInputes}
							required
						/>

						<input
							type="text"
							name="subscription"
							id="subscription"
							autoComplete="off"
							placeholder="Subscription"
							value={user.subscription}
							onChange={handleInputes}
							required
						/>

						<input
							type="password"
							name="password"
							id="password"
							autoComplete="off"
							placeholder="Your Password"
							value={user.password}
							onChange={handleInputes}
							required
						/>

						<button>Register</button>
					</form>
				</div>
			)}
		</Fragment>
	);
};

export default Signup;

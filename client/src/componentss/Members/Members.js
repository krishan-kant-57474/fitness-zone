import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Members.module.css";
import Loader from "../../Ui/Loader";

const Members = ({ userInfo, setIsError }) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const userNameHandler = (event) => {
		setName(event.target.value);
	};
	const formData = async (event) => {
		event.preventDefault();
		setLoading(true);
		const res = await fetch("/getUserData", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name,
			}),
		});
		console.log(res);
		const data = await res.json();
		console.log(data);
		if (res.status === 403) {
			// window.alert(data.message);
			setIsError({
				status: true,
				message: data.message,
			});
		} else {
			setIsError({
				status: true,
				message: "find Successful",
			});
			// window.alert("find Successful");
			navigate("/userdetails", { state: data });
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
				<form onSubmit={formData}>
					<div className={classes["main-box"]}>
						<div className={classes.heading}>
							<h3>Members</h3>
						</div>
						<div className={classes.inputId}>
							<input
								type="text"
								placeholder="Enter Name or Mamber ID"
								onChange={userNameHandler}
							/>
						</div>
					</div>
				</form>
			)}
		</Fragment>
	);
};

export default Members;

import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./componentss/Navbar/Navbar";
import Home from "./componentss/Home/Home";
import About from "./componentss/AboutUs/About";
import Login from "./componentss/Login/Login";
import Members from "./componentss/Members/Members";
import Dashboard from "./componentss/Dashboard/Dashboard";
import Singup from "./componentss/NewMember/Singup";
import Details from "./componentss/UserDetails/Details";
import Errorpage from "./componentss/Errorpage/Errorpage";
import Logout from "./componentss/Logout";
import Error from "./componentss/Error/Error";
import Subscription from "./componentss/Subscription/Subscription";
import Footer from "./componentss/Footer/Footer";
import Loader from "./Ui/Loader";

const App = () => {
	const [userInfo, setUserInfo] = useState("");
	const [update, setUpdate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState({
		status: false,
		message: "",
	});

	const userData = (data) => {
		setUserInfo(data);
	};

	const handleError = () => {
		setIsError(false);
	};

	return (
		<Fragment>
			<Navbar
				userData={userData}
				update={update}
				setUserInfo={setUserInfo}
				setLoading={setLoading}
			/>
			{isError.status && (
				<Error onHideCart={handleError} message={isError.message} />
			)}
			{loading ? (
				<Loader />
			) : (
				<>
					<Routes>
						<Route path="/" element={<Home userInfo={userInfo} />} />
						<Route path="/aboutus" element={<About userInfo={userInfo} />} />
						<Route
							path="/login"
							element={
								<Login
									setUpdate={setUpdate}
									setIsError={setIsError}
									userInfo={userInfo}
								/>
							}
						/>
						<Route
							path="/dashboard"
							element={<Dashboard userInfo={userInfo} />}
						/>
						<Route
							path="/members"
							element={<Members userInfo={userInfo} setIsError={setIsError} />}
						/>
						<Route
							path="/userdetails"
							element={<Details userInfo={userInfo} setIsError={setIsError} />}
						/>
						<Route
							path="/newMember"
							element={<Singup userInfo={userInfo} setIsError={setIsError} />}
						/>
						<Route path="/logout" element={<Logout setUpdate={setUpdate} />} />
						<Route path="/subscriptionDetails" element={<Subscription />} />
						<Route path="/*" element={<Errorpage setIsError={setIsError} />} />
					</Routes>
					<Footer />
				</>
			)}
		</Fragment>
	);
};

export default App;

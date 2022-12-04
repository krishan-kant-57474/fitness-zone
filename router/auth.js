const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate, authorizeRoles } = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const User = require("../models/userSchema");

//register

router.post("/register", async (req, res) => {
	const { name, email, phone, password, subscription } = req.body;
	console.log(req.body);

	if (!name || !email || !phone || !password) {
		return res.status(422).json({ message: "Please enter all the data" });
	}
	try {
		const userExist = await User.findOne({ email: email });

		console.log(
			userExist,
			"------------------------------------------------------"
		);

		if (userExist) {
			return res.status(422).json({ message: "User already exist" });
		} else {
			console.log("hiiii");
			const user = new User({
				name,
				email,
				phone,
				password,
				subscription,
			});

			await user.save();
			res.status(201).json({ massage: "successfully........" });
		}
	} catch (error) {
		res.status(422).json({ message: error._message });
		console.log(error);
	}
});

//login
router.post("/signin", async (req, res) => {
	try {
		const { name, password } = req.body;

		if (!name || !password) {
			return res.status(400).json({ message: "plzz fill the data" });
		}

		const userLogin = await User.findOne({ name: name });

		if (userLogin) {
			const isMatch = await bcrypt.compare(password, userLogin.password);

			const token = await userLogin.generateAuthToken();

			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true,
			});

			if (!isMatch) {
				res.status(400).json({ message: "invalid candidate" });
			} else {
				res.send({
					message: "signin successfully",
					role: userLogin.role,
				});
			}
		} else {
			res.status(400).json({ message: "invalid candidate" });
		}
	} catch (error) {
		console.log(error);
	}
});

// about us page

router.get("/me", authenticate, (req, res) => {
	console.log("hello gays you on about page");
	res.send(req.rootUser);
});

// getUserData

router.post(
	"/getUserData",
	authenticate,
	authorizeRoles("admin"),
	async (req, res) => {
		console.log("hello gays you on getData page");
		const { name } = req.body;
		const user = await User.findOne({ name: name });
		if (user) {
			res.status(200).json({
				success: true,
				user,
			});
		} else {
			res.status(403).json({
				success: false,
				message: "User not find",
			});
		}
	}
);

//logout page
router.get("/logout", authenticate, async (req, res) => {
	console.log("hello gays my logout page");

	req.rootUser.tokens = [];
	res.clearCookie("jwtoken", { path: "/" });
	await req.rootUser.save();
	res.status(200).send("user logout");
});

module.exports = router;

const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.authenticate = async (req, res, next) => {
	try {
		const token = req.cookies.jwtoken; //we only get this because of cookies parser//

		// console.log(token);

		const verifytoken = jwt.verify(token, process.env.SECRET_KEY);

		// console.log(verifytoken);

		const rootUser = await User.findOne({
			_id: verifytoken._id,
			"tokens.token": token,
		});

		// console.log(rootUser);

		if (!rootUser) {
			throw new Error("in authemticate User not Found"); //in console//
		}

		req.token = token;
		req.rootUser = rootUser;
		req.userID = rootUser._id;
		// console.log(req.userID);

		next();
	} catch (error) {
		res.status(401).send("unauthorized");
		console.log("unauthorizid........");
	}
};

exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		console.log(req.rootUser.role);

		if (!roles.includes(req.rootUser.role)) {
			return next(
				res.status(403).json({
					success: false,
					message: `Role: ${req.rootUser.role} is not allowed to access this resource`,
				})
			);
		}

		next();
	};
};

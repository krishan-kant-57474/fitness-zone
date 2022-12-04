const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//i forgot new
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "user",
	},
	date: {
		type: Date,
		default: Date.now,
	},
	subscription: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	const kk = this.isModified("password");

	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
		next();
	}
});

// we are generating token here//
userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
		return token;
	} catch (error) {
		console.log(error);
	}
};

// stored the new data message in database//
userSchema.methods.addMessage = async function (name, email, phone, message) {
	// console.log("t4");
	try {
		// console.log("t5");
		this.messages = this.messages.concat({ name, email, phone, message });
		await this.save();
		return this.messages;
	} catch (error) {
		console.log(error);
	}
};

const User = mongoose.model("USER", userSchema); //model create karna like collection create karna

module.exports = User;

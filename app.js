const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

app.use(require("./router/auth"));

//static
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`connect server successfuly port no. ${PORT}`);
});

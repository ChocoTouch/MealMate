const express = require("express");
const authController = require("../controllers/auth");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("AUTH Time", event.toString());
	next();
});

router.post("/login", authController.login);

router.put("/register", authController.register);

module.exports = router;

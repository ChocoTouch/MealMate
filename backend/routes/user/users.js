const express = require("express");
const userController = require("../../controllers/user/user");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("USER Time", event.toString());
	next();
});

router.get("/", userController.getAllUsers);

router.get("/me", userController.getMyUser);

router.get("/:id", userController.getUser);

router.patch("/me", userController.updateMyProfile);

module.exports = router;

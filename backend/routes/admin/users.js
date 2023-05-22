const express = require("express");
const userController = require("../../controllers/admin/user");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("USER Time", event.toString());
	next();
});

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.put("", userController.addUser);

router.patch("/:id", userController.updateUser);

router.post("/untrash/:id", userController.untrashUser);

router.delete("/trash/:id", userController.trashUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;

const express = require("express");
const dietController = require("../../controllers/user/diet");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("DIET Time", event.toString());
	next();
});

router.get("/", dietController.getAllDiets);

router.get("/:id", dietController.getDiet);

module.exports = router;

const express = require("express");
const dietController = require("../../controllers/admin/diet");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("DIET Time", event.toString());
	next();
});

router.get("/", dietController.getAllDiets);

router.get("/:id", dietController.getDiet);

router.put("", dietController.addDiet);

router.patch("/:id", dietController.updateDiet);

router.post("/untrash/:id", dietController.untrashDiet);

router.delete("/trash/:id", dietController.trashDiet);

router.delete("/:id", dietController.deleteDiet);

module.exports = router;

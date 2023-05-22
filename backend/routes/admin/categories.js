const express = require("express");
const categoryController = require("../../controllers/admin/category");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("CATEGORY Time", event.toString());
	next();
});

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategory);

router.put("", categoryController.addCategory);

router.patch("/:id", categoryController.updateCategory);

router.post("/untrash/:id", categoryController.untrashCategory);

router.delete("/trash/:id", categoryController.trashCategory);

router.delete("/:id", categoryController.deleteCategory);

router.put("/ingredient/:id", categoryController.addIngredientInCategory);

router.delete("/ingredient/:id", categoryController.deleteIngredientInCategory);

module.exports = router;

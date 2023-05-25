const express = require("express");
const menuController = require("../../controllers/user/menu");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("MENU Time", event.toString());
	next();
});

router.get("/", menuController.getAllMenus);

router.get("/me", menuController.getMyMenus);

router.get("/:id", menuController.getMenu);

router.put("/meal/:id", menuController.addMealInMyMenu);

router.delete("/meal/:id", menuController.deleteMealInMyMenu);

router.put("/day/:id", menuController.addDayOfWeekInMyMenu);

router.delete("/day/:id", menuController.deleteDayOfWeekInMyMenu);

router.put("/course/:id", menuController.addCourseInMyMenu);

router.delete("/course/:id", menuController.deleteCourseInMyMenu);

router.put("/recipe/:id", menuController.addRecipeInMyMenu);

router.delete("/recipe/:id", menuController.deleteRecipeInMyMenu);

router.put("/me", menuController.addMyMenu);

router.patch("/me/:id", menuController.updateMyMenu);

router.delete("/me/trash/:id", menuController.trashMyMenu);

router.post("/me/untrash/:id", menuController.untrashMyMenu);

module.exports = router;

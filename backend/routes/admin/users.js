/* Import des modules nécessaires */
const express = require("express");
const userController = require("../../controllers/admin/user");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("USER Time", event.toString());
  next();
});

/* GET */
router.get("/", userController.getAllUsers);

/* GET ID */
router.get("/:id", userController.getUser);

/* PUT */
router.put("", userController.addUser);

/* PATCH ID & BODY*/
router.patch("/:id", userController.updateUser);

/* POST UNTRASH */
router.post("/untrash/:id", userController.untrashUser);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", userController.trashUser);

/* HARD DELETE ID*/
router.delete("/:id", userController.deleteUser);

/* GET ID*/
router.get("/recipes/:id", userController.getRecipesForUser);

/* GET ID*/
router.get("/menus/:id", userController.getMenusForUser);

module.exports = router;

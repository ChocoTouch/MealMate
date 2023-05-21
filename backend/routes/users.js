/* Import des modules nécessaires */
const express = require("express");
const userController = require("../controllers/user");
const check = require("../jsonwebtoken/check");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("User Time", event.toString());
  next();
});

/* GET */
router.get("/", userController.getAllUsers);

/* GET ID */
router.get("/:id", userController.getUser);

/* PUT */
router.put("", check.checkAdminTokenMW, userController.addUser);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, userController.updateUser);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  userController.untrashUser
);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", check.checkAdminTokenMW, userController.trashUser);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, userController.deleteUser);

/* GET ID*/
router.get("/recipes/:id", userController.getRecipesForUser);

/* GET ID*/
router.get("/menus/:id", userController.getMenusForUser);

module.exports = router;

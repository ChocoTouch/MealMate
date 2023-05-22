/* Import des modules */
const express = require("express");
const cors = require("cors");
const check = require("./jsonwebtoken/check");
const errorHandler = require("./error/errorHandler");

/* Import de la connexion à la base de données */
let DB = require("./db.config");

/* Initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Import des modules de routage */
const auth_router = require("./routes/auth")
const admin_router = require("./routes/admin/adminrouter");
const public_router = require("./routes/public/publicrouter");
const user_router = require("./routes/user/userrouter");

/* Mise en place du routage */
app.get("/", (req, res) =>
  res.send(`Welcome to the MealMate API by Bauchet Anthony`)
);
app.use("/auth", auth_router);
app.use("/public", public_router);
app.use("/user", check.checkTokenMW, user_router);
app.use("/admin", check.checkAdminTokenMW, admin_router);
app.get("*", (req, res) => res.status(501).send("Ressource non existant"));
app.use(errorHandler);

/* Demarrage serveur avec test DB*/
DB.sequelize
  .authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server running on ${process.env.SERVER_PORT}. Enjoy your stay !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));

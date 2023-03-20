/* Import des modules */
const express = require("express");
const cors = require("cors");
const checkTokenMW = require("./jsonwebtoken/check");
const errorHandler = require("./error/errorHandler");

/* Import de la connexion à la base de données */
let DB = require("./db.config");

/* Initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Import des modules de routage */
const user_router = require("./routes/users");
const auth_router = require("./routes/auth");

/* Mise en place du routage */
app.get("/", (req, res) => res.send(`Welcome to the MealMate API by Bauchet Anthony`));
app.use("/users", checkTokenMW, user_router); //checkTokenMW,
app.use("/auth", auth_router);
app.get("*", (req, res) => res.status(501).send("Ressource non existant"));
app.use(errorHandler);

/* Demarrage serveur avec test DB*/
DB.sequelize.authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server running on ${process.env.SERVER_PORT}. Enjoy your stay !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));

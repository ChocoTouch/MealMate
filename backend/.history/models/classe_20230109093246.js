/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");
const DB = require("../db.config");

/* Définition du modèle Classe */
const Classe = DB.define(
  "Classe",
  {
    ClassID: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Nom: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    Arme: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    Magie: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    },
  },
  { paranoid: true } // softDelete
);

/* Synchronisation du modèle */
Classe.sync();
//Classe.sync({force: true});
//Classe.sync({alter: true});

module.exports = Classe;

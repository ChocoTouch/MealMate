/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const DB = require("../db.config");

/* Définition du modèle Tecette */
const Recette = DB.define(
    "Recette",
    {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING(30),
            defaultValue: "",
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT(250),
            defaultValue: "",
            allowNull: false,
        },
        instructions: {
            type: DataTypes.STRING(2500),
            defaultValue: "",
            allowNull: false,
        },
        pays: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER(7),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
    },
    { paranoid: true } // softDelete
); 

/* Synchronisation du modèle */
//Recette.sync();
//Recette.sync({force: true});
Recette.sync({ alter: true });

module.exports = Recette;

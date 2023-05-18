/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Course_menu = sequelize.define(
    "Course_menu",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      }
    },
    { paranoid: true } // softDelete
  );
  return Course_menu;
};

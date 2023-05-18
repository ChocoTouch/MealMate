/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Recipe_diet = sequelize.define(
    "Recipe_diet",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      }
    },
    { paranoid: true } // softDelete
  );
  return Recipe_diet;
};

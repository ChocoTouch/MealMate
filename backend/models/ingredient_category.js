/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Ingredient_category = sequelize.define(
    "Ingredient_category",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { paranoid: true } // softDelete
  );
  return Ingredient_category;
};

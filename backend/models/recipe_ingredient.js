/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Recipe_ingredient = sequelize.define(
    "Recipe_ingredient",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      count: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
    },
  );
  return Recipe_ingredient;
};

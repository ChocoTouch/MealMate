/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Menu_recipe = sequelize.define(
    "Menu_recipe",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      course_id: {
        type: DataTypes.INTEGER(10),
        allowNull:false,
      },
      meal_id: {
        type: DataTypes.INTEGER(10),
        allowNull:false,
      },
      day_id: {
        type: DataTypes.INTEGER(10),
        allowNull:false,
      },
    },
  );
  return Menu_recipe;
};

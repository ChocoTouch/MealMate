/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

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
      count: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
    },
    { paranoid: true } // softDelete
  );
  return Menu_recipe;
};

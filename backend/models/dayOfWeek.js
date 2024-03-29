/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const DayOfWeek = sequelize.define(
    "DayOfWeek",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    },
    { paranoid: true } // softDelete
  );
  return DayOfWeek;
};

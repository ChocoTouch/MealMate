/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
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
      description: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    },
    { paranoid: true } // softDelete
  );
  return Course;
};

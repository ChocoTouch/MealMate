/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Recette = sequelize.define(
    "Recette",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      instructions: {
        type: DataTypes.STRING(2500),
        allowNull: false,
      },
      pays: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      vegetarien: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      vegetalien: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      sansgluten: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { paranoid: true } // softDelete
  );
  return Recette;
};

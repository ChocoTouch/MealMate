/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Categorie = sequelize.define(
    "Categorie",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    { paranoid: true } // softDelete
  );
  return Categorie;
};

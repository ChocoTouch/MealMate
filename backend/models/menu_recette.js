/* Import des modules nécessaires */
const { STRING } = require("sequelize");
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Menu_recette = sequelize.define(
    "Menu_recette",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      count: {
        type: DataTypes.INTEGER(4),
      },
      // jours: {
      //   type: DataTypes.ARRAY(STRING),
      //   allowNull: false,
      // },
      // repas: {
      //   type: DataTypes.ARRAY(STRING),
      //   allowNull: false,
      // }
    },
    { paranoid: true } // softDelete
  );
  return Menu_recette;
};

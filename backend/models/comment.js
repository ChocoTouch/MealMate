/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
  const Comment = sequelize.define(
    "Comment",
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
      user_username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      recipe_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      menu_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    { paranoid: true } // softDelete
  );
  return Comment;
};

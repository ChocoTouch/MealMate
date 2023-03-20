/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

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
            recette_id: {
                type: DataTypes.INTEGER(10),
                allowNull: true,
            },
            menu_id: {
                type: DataTypes.INTEGER(10),
                allowNull: true,
            }

        },
        { paranoid: true } // softDelete
    );
    return Comment;
}

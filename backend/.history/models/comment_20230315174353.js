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
            parent_id: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
            nom: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        { paranoid: true } // softDelete
    );
    return Comment;
}

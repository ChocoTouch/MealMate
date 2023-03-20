/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
    const Recette_ingredient = sequelize.define(
        "Recette_ingredient",
        {
            id: {
                type: DataTypes.INTEGER(10),

                autoIncrement: true,
                allowNull: false
            },
        },
        { paranoid: true },
        { timestamps: false } // softDelete
    );
    return Recette_ingredient;
}

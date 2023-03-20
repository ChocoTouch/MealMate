/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
    const Recette_ingredient = sequelize.define(
        "Recette_ingredient",
        {
            id: {
                type: DataTypes.INTEGER(10),
                primaryKey: true,
                autoIncrement: true,
            },
        },
        { paranoid: true } // softDelete
    );
    return Recette_ingredient;
}

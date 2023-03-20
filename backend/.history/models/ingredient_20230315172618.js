/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
    const Ingredient = sequelize.define(
        "Ingredient",
        {
            id: {
                type: DataTypes.INTEGER(10),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            categorie_id: {
                type: DataTypes.INTEGER(10),
                primaryKey: true,
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
            pays: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            calories: {
                type: DataTypes.INTEGER(7),
                allowNull: false,
            },
            prix: {
                type: DataTypes.INTEGER(7),
                allowNull: false,
            }
        },
        { paranoid: true } // softDelete
    );
    return Ingredient;
}


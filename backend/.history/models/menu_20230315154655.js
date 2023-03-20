/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
    const Repas = sequelize.define(
        "Repas",
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
                allowNull: false,
            },
            jour_id: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            momentrepas: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            pays: {
                type: DataTypes.STRING(30),
                allowNull: false,
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
    return Menu;
}

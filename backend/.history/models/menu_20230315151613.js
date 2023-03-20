/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
    const Menu = sequelize.define(
        "Menu",
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
                type: DataTypes.STRING(30),
                defaultValue: "",
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(250),
                defaultValue: "",
                allowNull: false,
            },
            instructions: {
                type: DataTypes.STRING(2500),
                defaultValue: "",
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

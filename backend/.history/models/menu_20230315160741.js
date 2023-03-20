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
            name: {
                type: DataTypes.STRING(50),
            },
            repas: {
                type: DataTypes.JSON,
            }
        },
        { paranoid: true } // softDelete
    );
    return Menu;
}

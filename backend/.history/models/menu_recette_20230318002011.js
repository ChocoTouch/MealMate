/* Import des modules nécessaires */
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
                allowNull: false
            },
        },
        { paranoid: true },// softDelete
    );
    return Menu_recette;
}

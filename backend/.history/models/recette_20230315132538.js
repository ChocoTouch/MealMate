/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const DB = require("../db.config");

/* Définition du modèle Tecette */
const Recette = DB.define(
    "Recette",
    {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING(30),
            defaultValue: "",
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT(250),
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
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
    },
    { paranoid: true } // softDelete
); 

/* Hook Sequelize */
User.beforeCreate(async (user, options) => {
    /* Hashage du mot de passe */
    let hash = await bcrypt.hash(
        user.motdepasse,
        parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    user.motdepasse = hash;
});

/* Méthode de vérification de mot de passe */
User.checkPassword = async (password, original) => {
    return await bcrypt.compare(password, original);
};

/* Synchronisation du modèle */
//User.sync();
//User.sync({force: true});
User.sync({ alter: true });

module.exports = User;

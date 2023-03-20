/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const DB = require("../db.config");
const bcrypt = require("bcrypt");

/* Définition du modèle */
const User = DB.define(
    "User",
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
        prenom: {
            type: DataTypes.STRING(30),
            defaultValue: "",
            allowNull: false,
        },
        pseudo: {
            type: DataTypes.STRING(30),
            defaultValue: "",
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(50),
            validate: {
                isEmail: true,
            },
        },
        motdepasse: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i,
        },
        telephone: {
            type: DataTypes.STRING(20),
            is: /^[0-9a-f]{64}$/i,
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
//User.sync({ alter: true });

module.exports = User;

/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const DB = require("../db.config");
const bcrypt = require("bcrypt");

/* Définition du modèle User */
const Utilisateur = DB.define(
    "Utilisateur",
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

// HOOK SEQUELIZE
Utilisateur.beforeCreate(async (utilisateur, options) => {
    // Hashage du mot de passe
    let hash = await bcrypt.hash(
        utilisateur.motdepasse,
        parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    utilisateur.motdepasse = hash;
});

// Méthode de vérification de mot de passe
Utilisateur.checkPassword = async (password, original) => {
    return await bcrypt.compare(password, original);
};

/* Synchronisation du modèle */
//User.sync();
//User.sync({force: true});
Utilisateur.sync({ alter: true });

module.exports = Utilisateur;

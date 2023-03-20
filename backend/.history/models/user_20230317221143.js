/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const { STRING } = require("sequelize");

/* Définition du modèle */
module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER(10),
                primaryKey: true,
                autoIncrement: true,
            },
            nom: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            prenom: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            pseudo: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(50),
                validate: {
                    isEmail: true,
                },
                unique: true,
            },
            motdepasse: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-f]{64}$/i,
            },
            telephone: {
                type: DataTypes.STRING(20),
                is: /^[0-9a-f]{64}$/i, //FIXME
                unique: true,
            },
            roles: {
                type: DataTypes.ARRAY(STRING),
                allowNull: false,
            }
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

    return User;
}



/* Import des modules nécessaires */
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

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
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      username: {
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
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
        //is: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{12,})\S$/,
        // Checks that a password has a minimum of 12 characters, 
        // at least 1 uppercase letter, 1 lowercase letter, 
        // and 1 number with no spaces.
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true,
      },
      roles: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      }
    },
    { paranoid: true } // softDelete
  );

  /* Hook Sequelize */
  User.beforeCreate(async (user, options) => {
    /* Hashage du mot de passe */
    let hash = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    user.password = hash;
  });

  /* Méthode de vérification de mot de passe */
  User.checkPassword = async (password, original) => {
    return await bcrypt.compare(password, original);
  };

  return User;
};

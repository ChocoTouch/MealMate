/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const DB = require("../db.config");
const bcrypt = require('bcrypt')


/* Définition du modèle User */
const User = DB.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    Nom: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    Prenom: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING(100),
      defaultValue: "",
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    Password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
    },
  },
  { paranoid: true }
  ) // softDelete

  // HOOK SEQUELIZE
  User.beforeCreate(async (user, options) => {
    // Hashage du mot de passe
    let hash = await bcrypt.hash(user.Password, parseInt(process.env.BCRYPT_SALT_ROUND))
    user.Password = hash;
  })

  // Check Password Method
  User.checkPassword = async (password, original) => {
    return await bcrypt.compare(password, original);
  }

/* Synchronisation du modèle */
User.sync();
//User.sync({force: true});
//User.sync({alter: true});

module.exports = User;

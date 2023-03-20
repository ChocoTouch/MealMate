/* Import des modules nécessaires */
const { DataTypes, UniqueConstraintError } = require("sequelize");
const DB = require("../db.config");
const bcrypt = require('bcrypt')


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
    Password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
    },
    Phone: {
      type: DataTypes.STRING(20),
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

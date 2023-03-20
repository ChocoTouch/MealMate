/* Import des modules nécessaires */
const jwt = require("jsonwebtoken");

/* Extraction du token */
const extractBearer = (authorization) => {
  if (typeof authorization != "string") {
    return false;
  }

  // Isolation du token
  const matches = authorization.match(/(bearer)\s+(\S+)/i);

  return matches && matches[2];
};

/* Vérification de la présence du token */
const checkTokenMW = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "Pas de Token d'authentification ." });
  }

  // Vérification de la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      jwt.verify(token, process.env.JWT_SECRETADMIN, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Token d'authentification invalide ." });
        }
      })
    }
    next(err);
  });
};

module.exports = checkTokenMW;

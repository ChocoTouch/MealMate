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
const checkAdminTokenMW = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "Pas de Token d'authentification ." });
  }

  // Vérification de la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Token d'authentification invalide ." });
    }
    if (decodedToken.roles === "ROLE_ADMIN"){
      next(err);
    }
    else{
      return res.status(401).json({ message: "Vous n'êtes pas un administrateur ." })
    }
  });
};

module.exports = checkAdminTokenMW;

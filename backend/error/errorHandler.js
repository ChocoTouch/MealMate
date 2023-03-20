const errorHandler = (err, req, res, next) => {
  // 0 : MESSAGE SIMPLE
  // 1 : MESSAGE SANS ERREUR
  // 2 : TOUTES LES INFORMATIONS
  debugLevel = 1;

  switch (debugLevel) {
    case 0:
      message = { message: err.message };
      if (err.name == "SequelizeDatabaseError") {
        message = { message: "Erreur de base de données" };
      }
      break;
    case 1:
      message = { message: err.message };
      break;
    case 2:
      message = { message: err.message, error: err };
      break;
    default:
      console.log("debugLevel incorrect");
  }
  return res.status(err.statusCode || 500).json(message);
};

module.exports = errorHandler;

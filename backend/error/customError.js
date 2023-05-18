class MainError extends Error {
  constructor(errorMessage, errorType = "") {
    super();

    this.name = this.constructor.name;
    this.message = errorMessage;

    switch (this.constructor.name) {
      case "AuthenticationError":
        if (errorType == 0) {
          this.statusCode = 400;
        } else if (errorType == 1) {
          this.statusCode = 404;
        } else {
          this.statusCode = 401;
        }
        break;
      case "UserError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;
      case "RecipeError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;
      case "MenuError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;
      case "CommentError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;
      case "CategoryError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;
      case "IngredientError":
        if (errorType == 0) {
          this.statusCode = 404;
        } else {
          this.statusCode = 409;
        }
        break;
      case "RequestError":
        this.statusCode = 400;
        break;
      default:
        console.log("Pas de systeme de gestion d'exception pour cette erreur");
    }
  }
}

class AuthenticationError extends MainError {}

class UserError extends MainError {}

class RecipeError extends MainError {}

class CommentError extends MainError {}

class CategoryError extends MainError {}

class IngredientError extends MainError {}

class MenuError extends MainError {}

class RequestError extends MainError {}

module.exports = {
  MainError,
  AuthenticationError,
  UserError,
  RecipeError,
  CommentError,
  CategoryError,
  IngredientError,
  MenuError,
  RequestError,
};

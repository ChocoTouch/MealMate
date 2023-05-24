const DB = require("../../db.config");
const Comment = DB.Comment;
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const { RequestError, CommentError } = require("../../error/customError");

exports.getComment = async (req, res, next) => {
	try {
		let commentID = parseInt(req.params.id);

		if (!commentID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let comment = await Comment.findOne({
			where: { id: commentID },
			include: [
				{ model: Menu, attributes: ["id", "name", "slug", "description", "user_username"] },
				{ model: Recipe, attributes: ["id", "name", "slug", "description", "user_username"] },
			],
			attributes: ["id", "message","user_username"]
		});

		if (comment === null) {
			throw new CommentError("Ce Commentaire n'existe pas .", 0);
		}

		return res.json({ data: comment });
	} catch (err) {
		next(err);
	}
};
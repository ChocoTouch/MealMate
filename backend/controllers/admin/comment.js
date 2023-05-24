const DB = require("../../db.config");
const Comment = DB.Comment;
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const { RequestError, CommentError } = require("../../error/customError");

exports.getAllComments = (req, res, next) => {
	Comment.findAll()
		.then((comments) => res.json({ data: comments }))
		.catch((err) => next(err));
};

exports.getComment = async (req, res, next) => {
	try {
		let commentID = parseInt(req.params.id);

		if (!commentID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let comment = await Comment.findOne({
			where: { id: commentID },
			include: [{ model: Menu }, { model: Recipe }],
		});

		if (comment === null) {
			throw new CommentError("Ce Commentaire n'existe pas .", 0);
		}

		return res.json({ data: comment });
	} catch (err) {
		next(err);
	}
};

exports.addMyCommentInMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);
		const { message } = req.body;

		if (!message || !menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		req.body.user_id = req.decodedToken.id;

		req.body.recipe_id = null;

		req.body.user_username = req.decodedToken.username;
		
		let comment = await Comment.create(req.body);

		return res.json({
			message: "Le menu a bien été commenté .",
			data: comment,
		});
	} catch (err) {
		next(err);
	}
};

exports.addMyCommentInRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);
		const { message } = req.body;

		if (!message || !recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		req.body.user_id = req.decodedToken.id;

		req.body.menu_id = null;

		req.body.user_username = req.decodedToken.username;

		let comment = await Comment.create(req.body);

		return res.json({
			message: "La recette a bien été commentée .",
			data: comment,
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashComment = async (req, res, next) => {
	try {
		let commentID = parseInt(req.params.id);

		if (!commentID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let comment = await Comment.restore({ where: { id: commentID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashComment = async (req, res, next) => {
	try {
		let commentID = parseInt(req.params.id);

		if (!commentID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Comment.destroy({ where: { id: commentID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		let commentID = parseInt(req.params.id);

		if (!commentID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Comment.destroy({ where: { id: commentID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteMyComment = async (req, res, next) => {
	try {
		let commentID = parseInt(req.params.id);

		if (!commentID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let comment  = await Comment.findOne({
			where: { id: commentID, user_id: req.decodedToken.id },
		});

		if (comment === null) {
			throw new CommentError("Ce commentaire n'existe pas ou ne vous appartient pas.", 0);
		}

		await Comment.destroy({ where: { id: commentID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
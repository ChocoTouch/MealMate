const DB = require("../../db.config");
const slugify = require("slugify");
const Course = DB.Course;
const { RequestError, CourseError } = require("../../error/customError");

exports.getAllCourses = (req, res, next) => {
	Course.findAll()
		.then((courses) => res.json({ data: courses }))
		.catch((err) => next(err));
};

exports.getCourse = async (req, res, next) => {
	try {
		let courseID = parseInt(req.params.id);

		if (!courseID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let course = await Course.findOne({
			where: { id: courseID },
			raw: true,
		});

		if (course === null) {
			throw new CourseError("Ce Plat n'existe pas .", 0);
		}

		return res.json({ data: course });
	} catch (err) {
		next(err);
	}
};

exports.addCourse = async (req, res, next) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let course = await Course.findOne({ where: { name: name } });

		if (course !== null) {
			throw new RequestError(`Le plat ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		let coursec = await Course.create(req.body);

		return res.json({
			message: "Le Plat a bien été créé .",
			data: coursec,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateCourse = async (req, res, next) => {
	try {
		const { name } = req.body;
		let courseID = parseInt(req.params.id);

		if (!courseID || !name) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let course = await Course.findOne({
			where: { id: courseID },
			raw: true,
		});

		if (course === null) {
			throw new CourseError("Ce Plat n'existe pas .", 0);
		}

		course = await Course.findOne({ where: { name: name } });

		if (course !== null) {
			throw new RequestError(`Le plat ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		let courseu = await Course.update(req.body, { where: { id: courseID } });

		return res.json({
			message: "Le Plat à bien été modifié .",
			data: courseu,
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashCourse = async (req, res, next) => {
	try {
		let courseID = parseInt(req.params.id);

		if (!courseID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let course = await Course.restore({ where: { id: courseID } });

		return res.status(204).json({
			message: "Le plat a bien été restauré .",
			data: course,
		});
	} catch (err) {
		next(err);
	}
};

exports.trashCourse = async (req, res, next) => {
	try {
		let courseID = parseInt(req.params.id);

		if (!courseID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Course.destroy({ where: { id: courseID } });

		return res.status(204).json({
			message: "Le plat a bien été mis dans la corbeille .",
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteCourse = async (req, res, next) => {
	try {
		let courseID = parseInt(req.params.id);

		if (!courseID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Course.destroy({ where: { id: courseID }, force: true });

		return res.status(204).json({
			message: "Le plat a bien été définitivement supprimé .",
		});
	} catch (err) {
		next(err);
	}
};

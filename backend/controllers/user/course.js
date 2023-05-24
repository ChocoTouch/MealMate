const DB = require("../../db.config");
const Course = DB.Course;
const { RequestError, CourseError } = require("../../error/customError");

exports.getAllCourses = (req, res, next) => {
	Course.findAll({ attributes: ["id", "name", "description", "slug"] })
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
			attributes: ["id", "name", "description", "slug"],
		});

		if (course === null) {
			throw new CourseError("Ce Plat n'existe pas .", 0);
		}

		return res.json({ data: course });
	} catch (err) {
		next(err);
	}
};

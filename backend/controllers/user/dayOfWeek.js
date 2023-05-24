const DB = require("../../db.config");
const DayOfWeek = DB.DayOfWeek;
const { RequestError, DayOfWeekError } = require("../../error/customError");

exports.getAllDayOfWeeks = (req, res, next) => {
	DayOfWeek.findAll({ attributes: ["id", "name", "slug"] })
		.then((dayOfWeeks) => res.json({ data: dayOfWeeks }))
		.catch((err) => next(err));
};

exports.getDayOfWeek = async (req, res, next) => {
	try {
		let dayOfWeekID = parseInt(req.params.id);

		if (!dayOfWeekID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let dayOfWeek = await DayOfWeek.findOne({
			where: { id: dayOfWeekID },
			attributes: ["id", "name", "slug"],
		});

		if (dayOfWeek === null) {
			throw new DayOfWeekError("Ce jour n'existe pas .", 0);
		}

		return res.json({ data: dayOfWeek });
	} catch (err) {
		next(err);
	}
};

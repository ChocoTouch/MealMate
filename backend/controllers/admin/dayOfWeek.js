const DB = require("../../db.config");
const slugify = require("slugify");
const DayOfWeek = DB.DayOfWeek;
const { RequestError, DayOfWeekError } = require("../../error/customError");

exports.getAllDayOfWeeks = (req, res, next) => {
	DayOfWeek.findAll()
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
			raw: true,
		});

		if (dayOfWeek === null) {
			throw new DayOfWeekError("Ce jour n'existe pas .", 0);
		}

		return res.json({ data: dayOfWeek });
	} catch (err) {
		next(err);
	}
};

exports.addDayOfWeek = async (req, res, next) => {
	try {
		const { name } = req.body;

		if (!name) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let dayOfWeek = await DayOfWeek.findOne({ where: { name: name } });

		if (dayOfWeek !== null) {
			throw new RequestError(`Le jour ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		let dayOfWeekc = await DayOfWeek.create(req.body);

		return res.json({
			message: "Le jour a bien été créé .",
			data: dayOfWeekc,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateDayOfWeek = async (req, res, next) => {
	try {
		const { name } = req.body;
		let dayOfWeekID = parseInt(req.params.id);

		if (!dayOfWeekID || !name) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let dayOfWeek = await DayOfWeek.findOne({
			where: { id: dayOfWeekID },
			raw: true,
		});

		if (dayOfWeek === null) {
			throw new DayOfWeekError("Ce jour n'existe pas .", 0);
		}

		dayOfWeek = await DayOfWeek.findOne({ where: { name: name } });

		if (dayOfWeek !== null) {
			throw new RequestError(`Le jour ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		await DayOfWeek.update(req.body, { where: { id: dayOfWeekID } });

		return res.json({
			message: "Le jour à bien été modifié ."
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashDayOfWeek = async (req, res, next) => {
	try {
		let dayOfWeekID = parseInt(req.params.id);

		if (!dayOfWeekID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await DayOfWeek.restore({ where: { id: dayOfWeekID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashDayOfWeek = async (req, res, next) => {
	try {
		let dayOfWeekID = parseInt(req.params.id);

		if (!dayOfWeekID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await DayOfWeek.destroy({ where: { id: dayOfWeekID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteDayOfWeek = async (req, res, next) => {
	try {
		let dayOfWeekID = parseInt(req.params.id);

		if (!dayOfWeekID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await DayOfWeek.destroy({ where: { id: dayOfWeekID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

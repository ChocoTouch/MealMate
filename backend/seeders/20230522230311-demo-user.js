"use strict";
const DB = require("../db.config");
const User = DB.User;
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					name: "testadminNAME",
					email: "test@admin.test",
					slug: "testadminNAME",
					firstname: "testadminFIRSTNAME",
					username: "testadminUSERNAME",
					password: "testadmin",
					roles: "ROLE_ADMIN",
				},
				{
					name: "testuserNAME",
					email: "test@user.test",
					slug: "testuserNAME",
					firstname: "testuserFIRSTNAME",
					username: "testuserUSERNAME",
					password: "testuser",
					roles: "ROLE_USER",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		// await queryInterface.bulkDelete({
		// 	model: "Users",
		// 	where: { name: { [Op.or]: ["testadminNAME", "testuserNAME"] } },
		// });
		return queryInterface.bulkDelete('Users', null, {});
	},
};

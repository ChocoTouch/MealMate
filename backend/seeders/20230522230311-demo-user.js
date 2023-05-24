"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		let hashadmin = await bcrypt.hash(
			"testadmin",
			parseInt(process.env.BCRYPT_SALT_ROUND)
		);
		let hashuser = await bcrypt.hash(
			"testuser",
			parseInt(process.env.BCRYPT_SALT_ROUND)
		);
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					name: "testadminNAME",
					email: "test@admin.test",
					slug: "testadminNAME",
					firstname: "testadminFIRSTNAME",
					username: "testadminUSERNAME",
					password: hashadmin,
					roles: "ROLE_ADMIN",
				},
				{
					name: "testuserNAME",
					email: "test@user.test",
					slug: "testuserNAME",
					firstname: "testuserFIRSTNAME",
					username: "testuserUSERNAME",
					password: hashuser,
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
		await queryInterface.bulkDelete("Users", { name: ["testuserNAME","testadminNAME"] } );
	},
};

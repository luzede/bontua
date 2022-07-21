const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

// Get the list of subjects to add to the choices for the string option
const subjectsPath = path.join(process.cwd(), 'subjects');
// Transform the list of subjects into a list of Choices object
const subjects = fs.readdirSync(subjectsPath).map(fileName => { return { name: fileName, value: fileName }; });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get information about a subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the information for')
				.setRequired(true)
				.addChoices(...subjects)),
	async execute(interaction) {
		const subject = interaction.options.getString('subject');
		const subjectPath = path.join(subjectsPath, subject);
		const infoPath = path.join(subjectPath, 'info.js');
		const infoFunction = require(infoPath);
		await infoFunction(interaction);
	},
};
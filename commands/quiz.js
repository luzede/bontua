const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

// Get the list of subjects to add to the choices for the string option
const subjectsPath = path.join(process.cwd(), 'subjects');
// Transform the list of subjects into a list of Choices object
const subjects = fs.readdirSync(subjectsPath).map(fileName => { return { name: fileName, value: fileName }; });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Random 10 multiple choice question quiz')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the quiz for')
				.setRequired(true)
				.addChoices(...subjects))
		.addIntegerOption(option =>
			option
				.setName('ID')
				.setDescription('The ID of the multiple choice question you want')
				.min_value(1)
				.max_value(10)),
	// async execute(interaction) {

	// },
};
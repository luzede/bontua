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
				.setName('id')
				.setDescription('The ID of the multiple choice question you want')),
	async execute(interaction) {
		const id = interaction.options.getInteger('id');
		if (id) {
			await interaction.deferReply();
		}
		else {
			await interaction.deferReply({ ephemeral: true });
		}

		// Get the subject path
		const subject = interaction.options.getString('subject');
		const subjectPath = path.join(subjectsPath, subject);

		// Get the path where the data is located and require it (import essentially)
		const dataPath = path.join(subjectPath, 'quizData.js');
		const dataMap = require(dataPath);

		// Get the quiz function path and require it (import essentially)
		const quizPath = path.join(subjectPath, 'quiz.js');
		const quizFunction = require(quizPath);

		await quizFunction(dataMap, interaction);
	},
};
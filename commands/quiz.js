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
		await interaction.deferReply({ ephemeral: true });

		const subject = interaction.options.getString('subject');
		const subjectPath = path.join(subjectsPath, subject);

		const dataPath = path.join(subjectPath, 'quizData.js');
		const dataMap = require(dataPath);

		const quizPath = path.join(subjectPath, 'quiz.js');
		const quizFunction = require(quizPath);

		const dataList = Array.from(dataMap.values());

		await quizFunction(dataList, interaction);
	},
};
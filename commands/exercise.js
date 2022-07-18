const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');


const subjectsPath = path.join(process.cwd(), 'subjects');
const subjects = fs.readdirSync(subjectsPath).map(fileName => { return { name: fileName, value: fileName }; });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('exercise')
		.setDescription('Gives a list of exercises in the chosen subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the exercises for')
				.addChoices(...subjects)
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('problem')
				.setDescription('The exercise you want')
				.setAutocomplete(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const subjectName = interaction.options.getString('subject');
		const problemName = interaction.options.getString('problem');

		const exercisePath = path.join(subjectsPath, subjectName);

		const dataPath = path.join(exercisePath, 'data.js');
		const dataMap = require(dataPath);

		const exerciseFunctionPath = path.join(exercisePath, 'exercise.js');
		const exerciseFunction = require(exerciseFunctionPath);

		if (dataMap.has(problemName) && problemName) {
			await interaction.editReply({ embeds: [exerciseFunction(dataMap.get(problemName))] });
		}
		else {
			await interaction.editReply({ content: 'You need to choose an exercise' });
		}
	},
};
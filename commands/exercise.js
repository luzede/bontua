const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

const subjectsPath = path.join(__dirname, 'subjects');
const subjects = fs.readdirSync(subjectsPath).map(fileName => { return { name: fileName, value: fileName }; });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exercise')
		.setDescription('Gives a list of exercises in the chosen subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the exercises for')
				.addChoices(...subjects))
		.addStringOption(option =>
			option
				.setName('problem')),
	async execute(interaction) {
		const subject = interaction.options.getString('subject');
		const exercisesPath = path.join(subjectsPath, subject);
		const objectData = require(exercisesPath + '/data.js');
		const exerciseFunction = require(exercisesPath + '/exercise.js');
		interaction.reply({ embeds: [exerciseFunction(objectData)] });
		// const exercises = fs.readdirSync(exercisesPath).map(fileName => { return { name: fileName, value: fileName }; });
		// await interaction.reply(`Here are the exercises for ${subject}:`);
		// await interaction.reply(exercises.map(exercise => `- ${exercise.name}`).join('\n'));
	},
};
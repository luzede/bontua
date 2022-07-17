const { SlashCommandBuilder } = require('@discordjs/builders');
// const fs = require('node:fs');
// const path = require('node:path');

// const subjectsPath = path.join(global.rootDirectory, 'subjects');
// const subjects = fs.readdirSync(subjectsPath).map(fileName => { return { name: fileName, value: fileName }; });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exercise')
		.setDescription('Gives a list of exercises in the chosen subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the exercises for')
				.setAutocomplete(true))
		.addStringOption(option =>
			option
				.setName('problem')
				.setDescription('The exercise you want')
				.setAutocomplete(true)),
	// async execute(interaction) {
	// 	await interaction.deferReply();
	// 	const subject = interaction.options.getString('subject');
	// 	const exercisePath = path.join(global.rootDirectory, 'subjects', subject);
	// 	const dataPath = path.join(exercisePath, 'data.js');
	// 	const objectData = require(dataPath);
	// 	const exerciseFunctionPath = path.join(exercisePath, 'exercise.js');
	// 	const exerciseFunction = require(exerciseFunctionPath);
	// 	await interaction.reply({ embeds: [exerciseFunction(objectData)] });
	// },
};
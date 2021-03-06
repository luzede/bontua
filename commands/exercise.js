const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

// Get the list of subjects to add to the choices for the string option
const subjectsPath = path.join(process.cwd(), 'subjects');
// Transform the list of subjects into a list of Choices object
const subjects = fs.readdirSync(subjectsPath).map(fileName => { return { name: fileName, value: fileName }; });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('exercise')
		.setDescription('Gives a list of problems in the chosen subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the problem for')
				.addChoices(...subjects)
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('problem')
				.setDescription('The problem you want')
				.setAutocomplete(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const subjectName = interaction.options.getString('subject');
		const problemName = interaction.options.getString('problem');

		const subjectPath = path.join(subjectsPath, subjectName);

		// Export the Map object from the data.js file that has all the objects in it
		const dataPath = path.join(subjectPath, 'exerciseData.js');
		const dataMap = require(dataPath);


		if (dataMap.has(problemName) && problemName) {
			// Export the function that builds the embed and replies with it
			const exerciseFunctionPath = path.join(subjectPath, 'exercise.js');
			const exerciseFunction = require(exerciseFunctionPath);
			// Get the object from the Map with the given name and pass it to the function, which returns an embed
			await exerciseFunction(dataMap.get(problemName), interaction);
		}
		else {
			// Export the function that returns a menu embed when passed with list of objects from dataMap
			const menuFunctionPath = path.join(subjectPath, 'exerciseMenu.js');
			const menuFunction = require(menuFunctionPath);

			// Get the list of objects from the Map (values are objects)
			const dataList = Array.from(dataMap.values());
			// Call the menuFunction which replies with the menu embed and adds collectors to the message for reactivity
			await menuFunction(dataList, interaction);
		}
	},
};
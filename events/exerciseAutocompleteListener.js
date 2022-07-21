const path = require('node:path');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isAutocomplete() || interaction.commandName != 'exercise') return;
		const subject = interaction.options.getString('subject');

		if (subject) {
			const focusedOption = interaction.options.getFocused(true);

			// Might have to add logic here if I add more options to the exercise command
			if (focusedOption.name == 'problem') {
				const exercisePath = path.join(process.cwd(), 'subjects', subject);
				const dataPath = path.join(exercisePath, 'exerciseData.js');
				const dataMap = require(dataPath);
				const dataInArray = Array.from(dataMap.keys(), key => ({ name: key, value: key }));
				let filtered = dataInArray.filter(choice => choice.name.startsWith(focusedOption.value));
				if (filtered.length > 25) {
					filtered = filtered.slice(0, 25);
				}
				await interaction.respond(filtered);
			}
		}
		else {
			await interaction.respond([]);
		}
	},
};

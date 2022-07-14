const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autocomplete')
		.setDescription('Test command how autocomplete should set up')
		.addStringOption(option => option
			.setName('name')
			.setDescription('Name of something')
			.setAutocomplete(true))
		.addStringOption(option => option
			.setName('theme')
			.setDescription('Theme of something')
			.setAutocomplete(true)),
	// async execute(interaction) {

	// }
};
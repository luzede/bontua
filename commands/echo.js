const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echoes back the message.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The message to echo back.')
				.setRequired(true)),

	async execute(interaction) {
		await interaction.reply(`${interaction.options.getString('input')}`);
	},
};
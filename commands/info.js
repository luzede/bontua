const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Sends info about the bot.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a useer')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Info about a server')),
};
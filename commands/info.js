const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Sends info about the bot.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Info about a server')),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === 'user') {
			const user = interaction.options.getUser('target');
			await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);

		}
		else if (subcommand === 'server') {
			const server = interaction.channel.guild;
			await interaction.reply(`Server Name: ${server.name}\nMember Count: ${server.memberCount}`);
		}
		await wait(10000).then(() => interaction.deleteReply());
	},
};
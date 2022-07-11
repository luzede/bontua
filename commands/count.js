const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count5')
		.setDescription('Counts to 5!'),
	async execute(interaction) {
		await interaction.reply('0');
		for (let i = 1; i <= 5; i++) {
			await wait(1000);
			await interaction.editReply(`${i}`);
		}
		await interaction.deleteReply();
	},
	global: true,
};
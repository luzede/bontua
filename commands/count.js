const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Counts to a number!')
		.addIntegerOption(option => option
			.setName('number')
			.setDescription('The number to count to')),
	async execute(interaction) {
		const number = interaction.options.addIntegerOption('number');
		await interaction.reply('0');
		for (let i = 1; i <= number; i++) {
			await wait(1000);
			await interaction.editReply(`${i}`);
		}
		await wait(1000);
		await interaction.editReply(`Done! I counted to ${number}`);
		await interaction.deleteReply();
	},
	global: true,
};
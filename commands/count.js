const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Counts to a number!')
		.setDMPermission(false)
		.addIntegerOption(option => option
			.setName('number')
			.setDescription('The number to count to')
			.setRequired(true)),
	async execute(interaction) {
		const number = interaction.options.getInteger('number');
		if (number <= 0) {
			await interaction.reply('Give me an integer greater than 0! (Natural number)');
			await wait(5000);
			await interaction.deleteReply();
			return;
		}
		await interaction.reply('0');
		for (let i = 1; i < number; i++) {
			await wait(1000);
			await interaction.editReply(`${i}`);
		}
		await wait(1000);
		try {
			await interaction.editReply(`Done! I counted to ${number}`)
				.then(message => setTimeout(() => message.delete(), 3000))
				.catch(error => {
					console.error(error);
					interaction.reply('There was an error while deleting the message!');
				});
		}
		catch (error) {
			await interaction.editReply('Failed to delete the message');
			console.error(error);
		}
		// await interaction.deleteReply();
	},
	global: true,
};
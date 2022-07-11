const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		// await interaction.reply({ content:'Pong!', ephemeral: true });
		await wait(5000);
		await interaction.editReply({ content: 'Pong again!', ephemeral: true });
		await interaction.followUp({ content: 'Pong again haha!', ephemeral: true });
	},
};

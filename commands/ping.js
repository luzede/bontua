const { SlashCommandBuilder } = require('@discordjs/builders');
// const wait = require('node:timers/promises').setTimeout;
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	// async execute(interaction) {
	// 	await interaction.deferReply({ ephemeral: true });
	// 	// await interaction.reply({ content:'Pong!', ephemeral: true });
	// 	await wait(5000);
	// 	await interaction.editReply({ content: 'Pong again!', ephemeral: true });
	// 	await interaction.followUp({ content: 'Pong again haha!', ephemeral: true });
	// },
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY')
					.setDisabled(true)
					.setEmoji('🔥'),
			);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');
		await interaction.reply({ content: 'Pong!', components: [row], embeds: [embed] });
	},
};

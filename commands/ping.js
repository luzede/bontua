const { SlashCommandBuilder } = require('@discordjs/builders');
// const wait = require('node:timers/promises').setTimeout;
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
// const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

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
					.setDisabled(false)
					.setEmoji('🔥'),
			);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');
		await interaction.reply({ content: 'Pong!', components: [row], embeds: [embed] });

		const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			await i.update({ content: 'A button was clicked', components: [], embeds: [] });
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	},

	// async execute(interaction) {
	// 	const row = new MessageActionRow()
	// 		.addComponents(
	// 			new MessageSelectMenu()
	// 				.setCustomId('select')
	// 				.setPlaceholder('Nothing selected')
	// 				.addOptions([
	// 					{
	// 						label: 'Select me',
	// 						description: 'This is a description',
	// 						value: 'first_option',
	// 					},
	// 					{
	// 						label: 'You can select me too',
	// 						description: 'This is also a description',
	// 						value: 'second_option',
	// 					},
	// 				]),
	// 		);

	// 	const embed = new MessageEmbed()
	// 		.setColor('#0099ff')
	// 		.setTitle('Some title')
	// 		.setURL('https://discord.js.org')
	// 		.setDescription('Some description here');
	// 	await interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
	// },
};

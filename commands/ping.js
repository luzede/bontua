const { SlashCommandBuilder } = require('@discordjs/builders');
// const wait = require('node:timers/promises').setTimeout;
// const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
// const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

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


	// async execute(interaction) {
	// 	const row = new MessageActionRow()
	// 		.addComponents(
	// 			new MessageButton()
	// 				.setCustomId('primary')
	// 				.setLabel('Primary')
	// 				.setStyle('PRIMARY')
	// 				.setDisabled(false)
	// 				.setEmoji('🔥'),
	// 		);
	// 	const embed = new MessageEmbed()
	// 		.setColor('#0099ff')
	// 		.setTitle('Some title')
	// 		.setURL('https://discord.js.org')
	// 		.setDescription('Some description here');
	// 	await interaction.reply({ content: 'Pong!', components: [row], embeds: [embed] });

	// 	const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;
	// 	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

	// 	collector.on('collect', async i => {
	// 		await i.deferUpdate();
	// 		await wait(10000);
	// 		await i.editReply({ content: 'A button was clicked', components: [], embeds: [] });
	// 	});

	// 	collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	// },

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


	// async execute(interaction) {
	// 	const row = new MessageActionRow()
	// 		.addComponents(
	// 			new MessageSelectMenu()
	// 				.setCustomId('select')
	// 				.setPlaceholder('Nothing selected')
	// 				.setMinValues(2)
	// 				.setMaxValues(3)
	// 				.setDisabled(false)
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
	// 					{
	// 						label: 'I am also an option',
	// 						description: 'This is a description as well',
	// 						value: 'third_option',
	// 					},
	// 				]),
	// 		);
	// 	await interaction.reply({ content: 'Pong!', components: [row] });

	// 	const filter = i => i.customId === 'select' && i.user.id === interaction.user.id;
	// 	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

	// 	collector.on('collect', async i => {
	// 		await i.deferUpdate();
	// 		row.components[0].setDisabled(true);
	// 		await wait(10000);
	// 		await i.editReply({ content: 'Selections were picked', components: [], embeds: [] });
	// 	});
	// },


	async execute(interaction) {
		const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('My modal');

		// await interaction.showModal(modal);

		// Add components to modal
		// Create the text input components
		const favoriteColorInput = new TextInputComponent()
			.setCustomId('favoriteColorInput')
		// The label is the prompt the user sees for this input
			.setLabel('What\'s your favorite color?')
		// Short means only a single line of text
			.setStyle('SHORT');
		const hobbiesInput = new TextInputComponent()
			.setCustomId('hobbiesInput')
			.setLabel('What\'s some of your favorite hobbies?')
		// Paragraph means multiple lines of text.
			.setStyle('PARAGRAPH');
		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
		const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);
		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
		// Show the modal to the user
		await interaction.showModal(modal);
	},
};

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) {
			return;
		}
		// console.log(interaction);
		// const filter = i => i.customId === 'primary' && i.user.id === interaction.user.id;
		// const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		// collector.on('collect', async i => {
		// 	await i.update({ content: 'A button was clicked', components: [], embeds: [] });
		// });

		// collector.on('end', async collected => {console.log(`Collected ${collected.size} items`);});
	},
};
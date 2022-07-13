// const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isSelectMenu()) return;

	// 	if (interaction.customId === 'select') {
	// 		await interaction.deferUpdate();
	// 		await wait(10000);
	// 		await interaction.editReply({ content: 'Something was selected!', components: [] });
	// 	}
	},
};
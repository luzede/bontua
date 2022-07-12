module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) {
			return;
		}
		console.log(interaction);
	},
};
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        if (!interaction.isSelectMenu()) return;

	    if (interaction.customId === 'select') {
            await interaction.deferUpdate();
            await wait(4000);
            await interaction.editReply({ content: 'Something was selected!', components: [] });
	    }
	},
}
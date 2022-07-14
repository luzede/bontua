module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isModalSubmit()) return;

		const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
		const hobbies = interaction.fields.getTextInputValue('hobbiesInput');

		interaction.reply({ content: `Your favorite color is ${favoriteColor} and your hobbies are ${hobbies}` });

		console.log({ favoriteColor, hobbies });
	},
};
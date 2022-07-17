const { MessageEmbed } = require('discord.js');

module.exports = function buildExerciseEmbed(object) {
	const thumbnailLink = 'https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png';
	const embed = new MessageEmbed()
		.setTitle(object.title)
		.setDescription(`**Εκφώνηση**\n${object.description}`)
		.setThumbnail(thumbnailLink);

	if (object.inputDescription) {
		embed.addField('Δεδομένα εισόδου', object.inputDescription);
	}
	if (object.outputDescription) {
		embed.addField('Δεδομένα εξόδου', object.outputDescription);
	}
	if (object.constraints) {
		embed.addField('Περιορισμοί', `\`\`\`\n${object.constraints}\n\`\`\``);
	}
	if (object.input) {
		embed.addField('Εισόδος', `\`\`\`\n${object.input}\n\`\`\``, true);
	}
	if (object.output) {
		embed.addField('Έξοδος', `\`\`\`\n${object.output}\n\`\`\``, true);
	}
	if (object.url) {
		embed.setURL(object.url);
	}
	return embed;
};
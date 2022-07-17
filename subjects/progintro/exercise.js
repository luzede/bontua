const { MessageEmbed } = require('discord.js');

module.exports = function buildExerciseEmbed(object) {
	const thumbnailLink = 'https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png';
	const embed = new MessageEmbed()
		.setTitle(object.title)
		.setDescription(`**Εκφώνηση**\n${object.description}`)
		.setThumbnail(thumbnailLink);

	if (object.inputDescription) {
		embed.addField({ name:'Δεδομένα εισόδου', value: object.inputDescription });
	}
	if (object.outputDescription) {
		embed.addField({ name:'Δεδομένα εξόδου', value: object.outputDescription });
	}
	if (object.constraints) {
		embed.addField({ name:'Περιορισμοί', value: `\`\`\`\n${object.constraints}\n\`\`\`` });
	}
	if (object.input) {
		embed.addField({ name:'Εισόδος', value: `\`\`\`\n${object.input}\n\`\`\``, inline: true });
	}
	if (object.output) {
		embed.addField({ name:'Έξοδος', value: `\`\`\`\n${object.output}\n\`\`\``, inline: true });
	}
	if (object.url) {
		embed.setURL(object.url);
	}
	return embed;
};
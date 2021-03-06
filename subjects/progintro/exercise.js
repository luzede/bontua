const { MessageEmbed } = require('discord.js');

// This exports a function that takes an object from the data.js file and returns an embed object for the exercise

module.exports = async function buildExerciseEmbed(object, interaction) {
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
		if (Array.isArray(object.input)) {
			for (let i = 0; i < object.input.length; i++) {
				embed.addField(`Είσοδος ${i + 1}`, `\`\`\`\n${object.input[i]}\n\`\`\``, true);
				embed.addField(`Εξόδος ${i + 1}`, `\`\`\`\n${object.output[i]}\n\`\`\``, true);
				if (!(i == object.input.length - 1)) {
					embed.addField('\u200B', '\u200B');
				}
			}
		}
		else {
			embed.addField('Είσοδος', `\`\`\`\n${object.input}\n\`\`\``, true);
			embed.addField('Εξόδος', `\`\`\`\n${object.output}\n\`\`\``, true);
		}
	}
	if (object.url) {
		embed.setURL(object.url);
	}

	if (object.difficulty && object.difficultyGrade) {
		embed.setAuthor({ name: `${object.difficulty} ${object.difficultyGrade}` });
	}
	else if (object.difficulty) {
		embed.setAuthor({ name: object.difficulty });
	}

	await interaction.editReply({ embeds: [embed] });
};
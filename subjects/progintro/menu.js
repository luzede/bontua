const { MessageEmbed } = require('discord.js');


module.exports = function buildMenuEmbed(objectList) {
	const length = objectList.length;
	const parts = Math.ceil(length / 30);

	const embedList = [];

	for (let i = 1; i <= parts; i++) {
		const embed = new MessageEmbed()
			.setTitle('Λίστα Επιλογών')
			.setThumbnail('https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png');

		const partList = objectList.slice((i - 1) * 30, (i - 1) * 30 + 30);
		let partString = '';
		for (let j = 1; j <= 15; j++) {
			if (j > partList.length) {
				break;
			}

			partString += `${partList[j - 1].title}` + numberOfSpaces(15 - partList[j - 1].title.length);
			if (partList[j - 1 + 15]) {
				partString += `${partList[j - 1 + 15].title}` + numberOfSpaces(15 - partList[j - 1 + 15].title.length);
			}
			else {
				partString += numberOfSpaces(15);
			}

			if (j != 15) {
				partString += '\n';
			}
		}
		embed.setDescription('```\n' + partString + '\n```');
		embed.setFooter({ text: `⬅️ Σελίδα ${i} από ${Math.ceil(parts)} ➡️` });
		embedList.push(embed);
	}
	return embedList;
};

// A function that we will pass the number of spaces needed to pad the string with
function numberOfSpaces(number) {
	let spaces = '';
	for (let i = 0; i < number; i++) {
		spaces += ' ';
	}
	return spaces;
}
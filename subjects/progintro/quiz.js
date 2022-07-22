const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Just a way to turn it into a word string to make it easier to put number emojis
const numberToWord = Map();
numberToWord.set(1, '🇦');
numberToWord.set(2, '🇧');
numberToWord.set(3, '🇨');
numberToWord.set(4, '🇩');
numberToWord.set(5, '🇪');

module.exports = async function quizFunction(dataList, interaction) {
	const embedList = [];
	const componentList = [];

	for (let i = 0; i < dataList.length; i++) {
		const data = dataList[i];

		// embed part
		const embed = new MessageEmbed()
			.setTitle(`Ερώτηση από ${data.year}`)
			.setDescription(data.question);
		if (data.code) {
			if (data.code.length == 1) {
				embed.addField('Κώδικας', data.code[0]);
			}
			else {
				for (let j = 0; j < data.code.length; j++) {
					embed.addField(`Κώδικας ${j + 1}`, data.code[j]);
				}
			}
		}
		let answerString = '';
		for (let j = 0; j < data.answers.length; j++) {
			answerString += `${numberToWord.get(j + 1)} ${data.answers[j]}\n`;
		}
		embed.addFields('Επιλογές', answerString);
		embedList.push(embed);

		// component part
		const row = new MessageActionRow();
		const buttonList = [];
		for (let j = 0; j < data.answers.length; j++) {
			const button = new MessageButton()
				.setCustomId(`${i}${j}`)
				.setEmoji(numberToWord.get(j + 1))
				.setStyle('SECONDARY');
			buttonList.push(button);
		}
		row.addComponents(...buttonList);
		componentList.push(row);
	}

    const filter = ()
};


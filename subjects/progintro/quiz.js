const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Just a way to turn it into a word string to make it easier to put number emojis
const numberToWord = new Map();
numberToWord.set(1, '🇦');
numberToWord.set(2, '🇧');
numberToWord.set(3, '🇨');
numberToWord.set(4, '🇩');
numberToWord.set(5, '🇪');

module.exports = async function quizFunction(dataList, interaction) {
	const quizLength = dataList.length;
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
					embed.addField(`Κώδικας ${j + 1}`, data.code[j], true);
				}
			}
		}
		let answerString = '';
		for (let j = 0; j < data.answers.length; j++) {
			answerString += `${numberToWord.get(j + 1)} ${data.answers[j]}\n`;
		}
		embed.addField('Επιλογές', answerString);
		embedList.push(embed);

		// component part
		const row = new MessageActionRow();
		const buttonList = [];
		for (let j = 0; j < data.answers.length; j++) {
			const button = new MessageButton()
			// j is the index of the answer, and i is the index of the question
				.setCustomId(`${i}${j}`)
				.setEmoji(numberToWord.get(j + 1))
				.setStyle('SECONDARY');
			buttonList.push(button);
		}
		row.addComponents(...buttonList);
		componentList.push(row);
	}

	// It does not need filter because I will make it ephemeral
	const endingTime = Date.now() + quizLength * 120000;
	embedList[0].setFooter({ text: `Ερώτηση ${1} από ${quizLength} Χρόνος: ${Math.floor((endingTime - Date.now()) / 60000)}:${Math.floor((endingTime - Date.now()) / 1000 % 60)}` });
	const message = await interaction.editReply({ embeds: [embedList[0]], components: [componentList[0]], fetchReply: true, ephemeral: true });

	const collector = message.createMessageComponentCollector([{ componentType: 'BUTTON', time: quizLength * 120000, errors: ['time'] }]);

	let quizIndex = 0;
	let rightAnswerCount = 0;
	collector.on('collect', async i => {
		await i.deferUpdate();
		if (i.customId[1] == dataList[quizIndex].correctAnswerIndex.toString()) {
			rightAnswerCount++;
		}
		if (quizIndex == dataList.length - 1) {
			const embed = new MessageEmbed()
				.setTitle('Αποτελέσματα')
				.setDescription(`Απάντησες σωστά σε ${rightAnswerCount} από ${quizLength} ερωτήσεις\nΣυνολικό χρόνο: ${Math.floor((endingTime - Date.now()) / 60000)}:${Math.floor((endingTime - Date.now()) / 1000 % 60)}\nΣυνολικό ποσοστό: ${Math.floor(rightAnswerCount / quizLength * 100)}%`);
			await i.editReply({ embeds: [embed], components: [], ephemeral: true });
			collector.stop();
			return;
		}
		quizIndex++;
		embedList[quizIndex].setFooter({ text: `Ερώτηση ${quizIndex + 1} από ${quizLength} | Χρόνος: ${Math.floor((endingTime - Date.now()) / 60000)}:${Math.floor((endingTime - Date.now()) / 1000 % 60)}` });
		await i.editReply({ embeds: [embedList[quizIndex]], components: [componentList[quizIndex]], ephemeral: true });
	});

	// collector.on('end', async () => {
	// 	const embed = new MessageEmbed()
	// 		.setTitle('Αποτελέσματα')
	// 		.setDescription(`Απάντησες σωστά σε ${rightAnswerCount} από ${quizLength} ερωτήσεις\nΣυνολικό χρόνο: ${Math.floor((endingTime - Date.now()) / 60000)}:${Math.floor((endingTime - Date.now()) / 1000 % 60)}\nΣυνολικό ποσοστό: ${Math.floor(rightAnswerCount / quizLength * 100)}%`);
	// 	await message.editReply({ embeds: [embed], components: [], ephemeral: true });
	// });
};


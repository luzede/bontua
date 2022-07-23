const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Just a way to turn it into a word string to make it easier to put number emojis
const numberToWord = new Map();
numberToWord.set(1, '🇦');
numberToWord.set(2, '🇧');
numberToWord.set(3, '🇨');
numberToWord.set(4, '🇩');
numberToWord.set(5, '🇪');

module.exports = async function quizFunction(dataList, interaction) {


	// The part below is when there is no ID given in the quiz commands option
	const quizLength = dataList.length;

	// The lists that will hold the embeds and components
	const embedList = [];
	const componentList = [];
	// Build the list of embeds and components for interaction
	for (let i = 0; i < dataList.length; i++) {
		const data = dataList[i];

		// embed part
		const embed = new MessageEmbed()
			.setTitle(`Ερώτηση από ${data.year}`)
			.setDescription(data.question)
			.setAuthor({ name: `ID: ${data.questionId}` });
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
	const startTime = Date.now();
	embedList[0].setFooter({ text: `Ερώτηση ${1} από ${quizLength} Χρόνος: ${Math.floor((endingTime - Date.now()) / 60000)} λεπτά` });
	const message = await interaction.editReply({ embeds: [embedList[0]], components: [componentList[0]], ephemeral: true, fetchReply: true });

	const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: quizLength * 120000, errors: ['time'] });

	let quizIndex = 0;
	let rightAnswerCount = 0;
	collector.on('collect', async i => {
		// You defer the update because it might take more than 3 seconds to update and Discord will not allow it
		await i.deferUpdate();
		// customId has the format of `ij` where i is the index of the question and j is the index of the answer
		if (i.customId[1] == dataList[quizIndex].correctAnswerIndex.toString()) {
			rightAnswerCount++;
		}
		// If it is the last question's interaction(i), stop the collector
		if (quizIndex == dataList.length - 1) {
			collector.stop();
			return;
		}
		quizIndex++;
		embedList[quizIndex].setFooter({ text: `Ερώτηση ${quizIndex + 1} από ${quizLength} | Χρόνος: ${Math.floor((endingTime - Date.now()) / 60000)} λεπτά` });
		// Replies with the next question
		await i.editReply({ embeds: [embedList[quizIndex]], components: [componentList[quizIndex]], ephemeral: true });
	});

	// The reason is user with collecter.stop() used, otherwise it is time
	collector.on('end', async (_, reason) => {
		if (reason == 'user') {
			const embed = new MessageEmbed()
				.setTitle('Αποτελέσματα')
				.setDescription(`Απάντησες σωστά σε **${rightAnswerCount}** από ${quizLength} ερωτήσεις\nΜέσα σε χρόνο: ${Math.ceil((Date.now() - startTime) / 60000)} λεπτά\nΣυνολικό ποσοστό: ${Math.floor(rightAnswerCount / quizLength * 100)}%`);
			await interaction.editReply({ embeds: [embed], components: [], ephemeral: true });
		}
	});
};


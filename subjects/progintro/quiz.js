const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Just a way to turn it into a word string to make it easier to put number emojis
const numberToWord = new Map();
numberToWord.set(1, '🇦');
numberToWord.set(2, '🇧');
numberToWord.set(3, '🇨');
numberToWord.set(4, '🇩');
numberToWord.set(5, '🇪');

module.exports = async function quizFunction(dataMap, interaction) {

	// First we will check if ID of the question is given, if yes, return the question with the given ID
	const id = interaction.options.getInteger('id');
	if (id) {
		// Get the question with the given ID
		const questionData = dataMap.get(id.toString());
		if (!questionData) {
			// If the question is not found, return an error message
			await interaction.editReply('Question not found');
			return;
		}
		const embed = new MessageEmbed()
			.setTitle(`Ερώτηση από ${questionData.year}`)
			.setDescription(questionData.question)
			.setAuthor({ name: `ID: ${questionData.questionId}` });
		if (questionData.code) {
			if (questionData.code.length == 1) {
				embed.addField('Κώδικας', questionData.code[0]);
			}
			else {
				for (let j = 0; j < questionData.code.length; j++) {
					embed.addField(`Κώδικας ${j + 1}`, questionData.code[j], true);
				}
			}
		}
		let answerString = '';
		for (let j = 0; j < questionData.answers.length; j++) {
			answerString += `${numberToWord.get(j + 1)} ${questionData.answers[j]}\n`;
		}
		embed.addField('Επιλογές', answerString);

		// component part
		const row = new MessageActionRow();
		const buttonList = [];
		for (let j = 0; j < questionData.answers.length; j++) {
			const button = new MessageButton()
			// j is the index of the answer, and i is the index of the question
				.setCustomId(`${j}`)
				.setEmoji(numberToWord.get(j + 1))
				.setStyle('SECONDARY');
			buttonList.push(button);
		}
		row.addComponents(...buttonList);

		const message = await interaction.editReply({ embeds: [embed], components: [row], fetchReply: true });
		const filter = i => {
			// This part makes sure the button in Discord does not give error message "This interaction failed"
			i.deferUpdate();
			// Make it work for everyone no matter who called
			return true;
			// return i.user.id === interaction.user.id;
		};

		// Instead of using collector, you can use a promise based approach, kind of don't understand it but seems to work good for one interaction only
		message.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 }).then(i => {
			const answer = i.customId;
			const correct = questionData.correctAnswerIndex;

			for (const button of row.components) {
				// This works because of Javascript's type coercion "1" == 1 is true, but if you don't like that, use === instead
				if (button.customId == correct) {
					button.setStyle('SUCCESS');
				}
				else if (button.customId == answer) {
					button.setStyle('DANGER');
				}
				button.setDisabled(true);
			}
			// If you have a message instance you can't use editReply, if you have CommandInteraction instance you cannot use edit()
			interaction.editReply({ embeds: [embed], components: [row] });
		}).catch(() => {
			for (const button of row.components) {
				if (button.customId == questionData.correctAnswerIndex.toString()) {
					button.setStyle('SUCCESS');
				}
				button.setDisabled(true);
			}
			interaction.editReply({ embeds: [embed], components: [row] });
		});

		return;
	}


	// The part below is when there is no ID given in the quiz commands option

	// Turn the map object into an array of map values
	const dataList = Array.from(dataMap.values());
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


const { MessageEmbed } = require('discord.js');

module.exports = async function menuFunction(dataList, interaction) {

	// Build the list of embeds for interaction
	const embedList = buildMenuEmbed(dataList);
	const message = await interaction.editReply({ embeds: [embedList[0]], fetchReply: true });

	// If there is only one embed, no need for buttons left and right arrow buttons
	if (embedList.length == 1) {
		message
			.then(msg => setTimeout(() => msg.delete(), 90000))
			.catch(error => console.error(error));
		return;
	}

	await message.react('⬅️');
	await message.react('➡️');

	// The first argument in the filter is reaction but you put _ to say that you don't need it
	const filter = (_, user) => {
		return !(user.bot);
	};

	const collector = message.createReactionCollector({ filter, time: 90000 });


	let embedIndex = 0;
	collector.on('collect', async (reaction, user) => {
		const userReactions = message.reactions.cache.filter(r => r.users.cache.has(user.id));
		for (const r of userReactions.values()) {
			await r.users.remove(user.id);
		}

		if (reaction.emoji.name === '⬅️' && embedIndex > 0) {
			embedIndex--;
			await interaction.editReply({ embeds: [embedList[embedIndex]], fetchReply: true });

		}
		else if (reaction.emoji.name === '➡️' && embedIndex < embedList.length - 1) {
			embedIndex++;
			await interaction.editReply({ embeds: [embedList[embedIndex]], fetchReply: true });
		}
	});

	collector.on('end', async () => {
		message.delete();
	});
};


function buildMenuEmbed(objectList) {
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

			partString += `${partList[j - 1].difficulty[0]}${partList[j - 1].difficultyGrade}- ${partList[j - 1].title}` + numberOfSpaces(14 - partList[j - 1].title.length);
			if (partList[j - 1 + 15]) {
				partString += `${partList[j - 1 + 15].difficulty[0]}${partList[j - 1 + 15].difficultyGrade}- ${partList[j - 1 + 15].title}` + numberOfSpaces(14 - partList[j - 1 + 15].title.length);
			}
			else {
				partString += numberOfSpaces(19);
			}

			if (j != 15) {
				partString += '\n';
			}
		}
		embed.setDescription('```\n' + partString + '\n```');
		embed.setFooter({ text: `⬅️ Σελίδα ${i} από ${Math.ceil(parts)} ➡️  Δύσκολο/Εύκολο[0-3]` });
		embedList.push(embed);
	}
	return embedList;
}

// A function that we will pass the number of spaces needed to pad the string with
function numberOfSpaces(number) {
	let spaces = '';
	for (let i = 0; i < number; i++) {
		spaces += ' ';
	}
	return spaces;
}
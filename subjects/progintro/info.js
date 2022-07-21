const { MessageEmbed } = require('discord.js');
// const infoData = require('./infoData.js');

const thumbnailLink = 'https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png';
const description = 'Information is missing, please try again later';

const embed = new MessageEmbed()
	.setTitle('Πληροφορίες του Μαθήματος')
	.setThumbnail(thumbnailLink)
	.setDescription(description);

module.exports = async function(interaction) {
	await interaction.reply({ embeds: [embed], content: 'Someone has to write the information with Discord markdown and paste it into the Description variable in the code' });
};

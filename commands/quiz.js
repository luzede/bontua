const { SlashCommandBuilder } = require('@discordjs/builders');
// const fs = require('node:fs');
// const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Random 10 multiple choice question quiz'),
	// async execute(interaction) {

	// },
};
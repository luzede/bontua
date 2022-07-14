const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member!')
		.addUserOption(option =>
			option.setName('target').setDescription('The member to ban'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const caller = interaction.member;
		const permittedRoles = ['Tamarian', 'Admin'];
		if (!caller.roles.cache.some(role => permittedRoles.includes(role.name))) return;

		const target = interaction.options.getUser('target');
		if (!target) {
			await interaction.reply('Give me a user to ban!');
			await wait(5000);
			await interaction.deleteReply();
			return;
		}
		await interaction.reply(`Banned ${target.username}#${target.discriminator}`);
		await wait(1000);
		await interaction.deleteReply();
	},
};
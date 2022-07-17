// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

global.rootDirectory = path.resolve(__dirname);


// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


client.commands = new Collection();


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => {event.execute(...args);});
	}
	else {
		client.on(event.name, (...args) => {event.execute(...args);});
	}
}


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isAutocomplete()) {
		if (interaction.commandName === 'autocomplete') {
			const focusedOption = interaction.options.getFocused(true);
			let choices;

			if (focusedOption.name === 'name') {
				choices = ['faq', 'install', 'collection', 'promise', 'debug'];
			}

			if (focusedOption.name === 'theme') {
				choices = ['halloween', 'christmas', 'summer'];
			}

			const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
			await interaction.respond(
				filtered.map(choice => ({ name: choice, value: choice })),
			);
		}
	}
	if (!interaction.isCommand()) return;


	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);

import 'dotenv/config';
import { 
    Client, 
    GatewayIntentBits, 
    REST, 
    Routes, 
    SlashCommandBuilder,
    AttachmentBuilder
} from 'discord.js';
import { askGemini, generateImage } from './ai.js';

// Create a new client instance
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
});

// Define commands
const commands = [
    new SlashCommandBuilder()
        .setName('reverse')
        .setDescription('Reverses the text you provide')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to reverse')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask Zen Bot (Gemini AI) anything!')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Your question or prompt')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('vis')
        .setDescription('Generate an image using Gemini AI')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Description of the image you want to create')
                .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Register commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        if (process.env.GUILD_ID) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );
            console.log('Successfully reloaded application (/) commands for guild.');
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            );
            console.log('Successfully reloaded application (/) commands globally.');
        }
    } catch (error) {
        console.error('Error registering commands:', error);
    }
})();

client.once('clientReady', c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'reverse') {
        const text = interaction.options.getString('text');
        const reversed = text.split('').reverse().join('');
        await interaction.reply({ content: `**Original:** ${text}\n**Reversed:** ${reversed}` });
    }

    if (interaction.commandName === 'ask') {
        const prompt = interaction.options.getString('prompt');
        
        await interaction.deferReply();

        try {
            const text = await askGemini(prompt);

            if (text.length > 2000) {
                await interaction.editReply({ content: text.substring(0, 1997) + '...' });
            } else {
                await interaction.editReply({ content: text });
            }
        } catch (error) {
            console.error('Gemini AI Error:', error);
            await interaction.editReply({ content: 'Sorry, I encountered an error while thinking. Please try again later.' });
        }
    }

    if (interaction.commandName === 'vis') {
        const prompt = interaction.options.getString('prompt');
        
        await interaction.deferReply();

        try {
            const buffer = await generateImage(prompt);
            const attachment = new AttachmentBuilder(buffer, { name: 'generated-image.png' });

            await interaction.editReply({ 
                content: `🎨 **Prompt:** ${prompt}`,
                files: [attachment] 
            });
        } catch (error) {
            console.error('Gemini Image Error:', error);
            await interaction.editReply({ content: 'Sorry, I encountered an error while creating your image. Please try again later.' });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

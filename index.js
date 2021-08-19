require('dotenv').config() //using enviroment variables to hide token
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) { //checks if interaction is slash command
    const { commandName, options } = interaction;
    const commandFile = require(`./slash/${commandName}`); //requiring a file with the command name
    let data = {};
    for (const option of options._hoistedOptions) {
      data[option.name] = option.value;
    };
    //I don't like using the djs way of getting option values, so I have this little loop to create the data 
    //console.log(data) to see what it looks like
    try {
      commandFile.execute(interaction, data) //running the execute function in the commandFile
    } catch (err) {
      interaction.reply({ content: 'ERROR!', ephemeral: true }) //incase error, still ack interaction
    }
  };
});

client.login(process.env.token);
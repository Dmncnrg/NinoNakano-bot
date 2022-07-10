const Discord = require('discord.js');

require("dotenv").config();

const generateImage = require("./generateImage")
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

let bot = {
    client,
    prefix: "n!",
    owners: ["689641352195080208"]
}

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashCommands")(bot, reload)
client.loadSlashCommands(bot, false)

const guildId = "957583171367604235"

client.on("ready", async () => {
    const guild = client.guilds.cache.get(guildId) 
    if(!guild)
        console.error("Target guild not found")
    
    await guild.commands.set([...client.slashcommands.values()])
    console.log(`Successfully loaded in ${client.slashcommands.size}`)
    process.exit(0)
})

client.login(process.env.TOKEN);
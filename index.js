const settings = require("./settings.json")
const Discord = require("discord.js")
const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();
const FiveM = require("fivem")
bot.commands = new Discord.Collection();


bot.on('ready', () => {
    console.log('RV Police está online!')
})

bot.on("guildMemberAdd", member => {
    let cargoundefined = member.guild.roles.cache.find(role => role.id ==="739217605432180786")
    console.log('Cargo "Undefined" adicionado ao membro: ' + member)
    member.roles.add(cargoundefined)
})

bot.on("message", (message) => {
    const srv = new FiveM.Server('177.54.146.42:30120')
    if (message.content.toLowerCase().startsWith(settings.prefix + "servidor")) {
      srv.getCurrentPlayers().then(data => console.log(data))
      srv.getPlayers().then(data =>
        message.channel.send(`Servidor está __ONLINE__ com **${data}** players.`))
    }
  })

bot.login(settings.token)
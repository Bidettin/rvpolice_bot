const settings = require("./settings.json")
const Discord = require("discord.js")
const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();
const FiveM = require("fivem")
bot.commands = new Discord.Collection();


/*bot.on('ready', () => {
    console.log('RV Police está online!')
    var i = 0;
    const srv = new FiveM.Server('177.54.146.42:30120')
    srv.getPlayers().then(quantidade =>
      timer = bot.setInterval(function() {
        var uptime = `${bot.uptime}`;
        var seg = Math.floor(uptime / 1000) % 60;
        var min = Math.floor(uptime / (1000 * 60)) % 60;
        var horas = Math.floor(uptime / (1000 * 60 * 60)) % 24;
        let tempo = `Estou online a ${horas} horas, ${min} minutos e ${seg} segundos`
  
        var gamePresence = [
            'Olhando o registro de oficiais!',
            `${quantidade} com habitantes.`,
            'Proteger e servir!'
        ];
        bot.user.setPresence({
            game: {
                name: gamePresence[i % gamePresence.length],
                type: 0
            }
        });
        i++;
    }, 5000)
    )
}) */


bot.on('ready', () => {
    const srv = new FiveM.Server('177.54.146.42:30120')
    setInterval(() => srv.getPlayers().then(quantidade => bot.user.setActivity(`Com ${quantidade} habitantes.`, {
        type: "PLAYING"
    })), 5000)
   
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
      srv.getPlayers().then(data =>
        message.channel.send(`Servidor está __ONLINE__ com **${data}** players.`))
    }
    
  })


bot.login(settings.token)

const Discord = require("discord.js"); 
const ee = require("./botconfig/embed.json");
const colors = require("colors"); 
const fs = require("fs"); 

const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});


["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('guildCreate', guild => {
  
  
  const guildmsg = new Discord.MessageEmbed()
  .setDescription('Thanks for adding PepeSecurity ! My Prefix **+** !')
  .setTimestamp()
  .setColor(ee.color)
  .setFooter(ee.footertext, ee.footericon)

  guild.systemChannel.send(guildmsg)
  });

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 
client.categories = fs.readdirSync("./commands/"); 
client.cooldowns = new Discord.Collection(); 
client.login(require("./botconfig/config.json").token);



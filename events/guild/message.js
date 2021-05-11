/*
  * @INFO
*/
const config = require("../../botconfig/config.json"); 
const ee = require("../../botconfig/embed.json"); 
const Discord = require("discord.js");
const { escapeRegex} = require("../../handlers/functions"); 

module.exports = async (client, message) => {
  try {
    
    if (!message.guild) return;
   
    if (message.author.bot) return;
    
    if (message.channel.partial) await message.channel.fetch();
    
    if (message.partial) await message.fetch();
    
    let prefix = config.prefix
   
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    
    if (!prefixRegex.test(message.content)) return;
    
    const [, matchedPrefix] = message.content.match(prefixRegex);
   
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    
    const cmd = args.shift().toLowerCase();
    
     if (cmd.length === 0){
      if(matchedPrefix.includes(client.user.id))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext,ee.footericon)
          .setTitle(`Hugh? I got pinged? Imma give you some help`)
          .setDescription(`To see all Commands type: \`${prefix}help\``)
        );
      return;
      }
    
    let command = client.commands.get(cmd);
   
    if (!command) command = client.commands.get(client.aliases.get(cmd));
   
    if (command){
        if (!client.cooldowns.has(command.name)) { 
            client.cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name); 
        const cooldownAmount = (command.cooldown || config.defaultCommandCooldown) * 1000; 
        if (timestamps.has(message.author.id)) { 
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000; 
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
            ); 
          }
        }
        timestamps.set(message.author.id, now); 
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
      try{
       
        try{  message.delete();   }catch{}
        
        if(command.memberpermissions && !message.member.hasPermission(command.memberpermissions, { checkAdmin: command.adminPermOverride, checkOwner: command.adminPermOverride })) {
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this command!")
            .setDescription(`You need these Permissions: \`${command.memberpermissions.join("`, ``")}\``)
          ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
        }
       
        let required_perms = ["ADD_REACTIONS","PRIORITY_SPEAKER","VIEW_CHANNEL","SEND_MESSAGES",
        "EMBED_LINKS","CONNECT","SPEAK","DEAFEN_MEMBERS"]
        if(!message.guild.me.hasPermission(required_perms)){
          try{ message.react("❌"); }catch{}
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | I don't have enough Permissions!")
            .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") +"`")
          )
        }
       
        command.run(client, message, args, message.member, args.join(" "), prefix);
      }catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
      }
    }
    else 
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`❌ Unkown command, try: **\`${prefix}help\`**`)
      .setDescription(`To get help on a specific command, type \`${prefix}help [command name]\``)
    ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
  }catch (e){
    return message.channel.send(
    new MessageEmbed()
    .setColor("RED")
    .setTitle(`❌ ERROR | An error occurred`)
    .setDescription(`\`\`\`${e.stack}\`\`\``)
);
  }
  /**
    * @INFO
    *
    * @INFO
    * 
    * @INFO
    * 
    * @INFO
  */
}

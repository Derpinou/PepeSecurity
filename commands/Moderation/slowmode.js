const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "slowmode",
    description: "Sets a SLOWMODE for this server",
    usage: "[COMMAND] + [USER]",
    category: "Moderation",
run: async (client, message, args) => {

    if (!message.member.hasPermission(["VIEW_AUDIT_LOG"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)

       if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
             let embed = new Discord.MessageEmbed()
             .setColor(ee.color)
             .setFooter(ee.footertext, ee.footericon)
               .setDescription(`✅ Slowmode successfully set to ${args[0]}!`)
               
           message.reply(embed)
           message.channel.setRateLimitPerUser(args[0])
       } else {
           let embed2 = new Discord.MessageEmbed()
           .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
               .setDescription(`Thats not an number!`)
               
           message.reply(embed2)
       }

   }
}
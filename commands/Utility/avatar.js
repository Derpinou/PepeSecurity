const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "avatar",
    aliases: ["pp"],
    category: "Utility",
    description: "Gets the avatar of a user or yourself",
    usage: "avatar [@USER]",
    run: async(client, message, args) => {
        /* If user isnt found it selects ur profile */
         const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
 
         if (!member.user.avatarURL) return message.channel.send(`That user does not have an avatar`);
 
         const avatar = new Discord.MessageEmbed()
             .setTitle(`${member.user.username}'s Avatar`)
             .setColor(ee.color)
             .setFooter(ee.footertext, ee.footericon)
             .setImage(member.user.avatarURL({format: `png`, dynamic: true, size: 1024}))
             .setURL(member.user.avatarURL({format: `png`, dynamic: true, size: 1024}))
         message.channel.send(avatar)
     }
 };

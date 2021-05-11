const {MessageEmbed} =require("discord.js")
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "developer",
    aliases: ["xb", "xokirbios"],
    category: "Utility",
    description: "Shows Information about the Developer",
    usage: "developer",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
      .setThumbnail("https://cdn.discordapp.com/avatars/673152664145625088/03e8161bc0a39a93297ee1d2c20ca263.webp")
      .setTitle("xb#3381")
      .setURL("https://learnbios.online")
      .setDescription(`
    > Hello I am **xokirBios** <:tux:841694407748878438> *(\`xb#3381\`)*
    > My [Github](https://github.com/xokirBios)
    > My [Twitter](https://twitter.com/xokirbios)
    `)
        message.channel.send(embed).catch(error => console.log(error));
    }
    }
const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "clear",
    category: "Moderation",
    description: "clear message",
    usage: "clear [NUMBER]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough permissions!- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Please enter a valid amount to delete messages!**');

        if (args[0] > 100)
            return message.channel.send("**Please provide a number under 100!**");

        if (args[0] < 1)
            return message.channel.send("**Please provide a number greater than 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}

const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "unlock",
    category: "Moderation",
    description: "unlock channel",
    usage: "lock",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("💥 \`404\` You do not have the required permission \`ADMINISTRATOR\`");

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`Channel Unlocked!`);
    }
}
const Discord = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "nuke",
    category: "Moderation",
    description: "nuke channel and recreate",
    usage: "nuke",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("💥 \`404\` You do not have the required permission \`MANAGE_MESSAGES\`");

        const position = message.channel.position;
        const rateLimitPerUser = message.channel.rateLimitPerUser;
        var newChannel = await message.channel.clone()
        message.channel.delete();
        newChannel.setPosition(position);

        newChannel.setRateLimitPerUser(rateLimitPerUser)
        newChannel.send(`💥 The purge claimed by <@${message.author.id}> has been done.`)
    }
}

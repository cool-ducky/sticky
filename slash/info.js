const { MessageEmbed } = require("discord.js");

module.exports = {
    async execute(interaction, data) {
        const input = data.query;
        let sticker;
        try {
            sticker = await interaction.client.fetchSticker(input);
        } catch (err) {
            sticker = interaction.guild.stickers.cache.find(sticker => sticker.name == input || sticker.id == input);
        };
        if (sticker) {
            if (sticker.format !== 'LOTTIE') {
                sticker.link = `https://cdn.discordapp.com/stickers/${sticker.id}.png`;
            };
            const embed = new MessageEmbed()
                .setTitle(sticker.name)
                .setFooter('Sticker ID: ' + sticker.id)
            if (sticker.description) embed.setDescription(sticker.description);
            if (sticker?.link) {
                embed.setThumbnail(sticker.link);
            } else {
                embed.description = 'Unable to display sticker!\n' + embed.description;
            };
            if (sticker.tags) {
                let tags = '';
                sticker.tags.forEach(tag => {
                    tags += `:${tag}: `
                });
                embed.addField('Tags:', tags, true);
            };
            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply('No sticker found :(');
        };
    }
};
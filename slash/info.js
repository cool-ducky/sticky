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
            interaction.reply(JSON.stringify(sticker));
        } else {
            interaction.reply('No sticker found :(');
        };
    }
};
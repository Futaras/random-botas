const { SlashCommandBuilder } = require("@discordjs/builders")
const { QueueRepeatMode } = require("discord-player")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loops the current song")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("loopsong")
                .setDescription("Loops the current song")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("loopqueue")
                .setDescription("Loops the entire queue")
        ),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

        const currentSong = queue.current

        if(interaction.options.getSubcommand() === "loopsong") {
            queue.setRepeatMode(QueueRepeatMode.TRACK)
            await interaction.editReply({
                embeds: [
                    new MessageEmbed().setDescription(`${currentSong.title} will now repeat!`).setThumbnail(currentSong.thumbnail)
                ]
            })
        } else if(interaction.options.getSubcommand() === "loopqueue") {
            queue.setRepeatMode(QueueRepeatMode.QUEUE)
            await interaction.editReply({
                embeds: [
                    new MessageEmbed().setDescription("The queue will now repeat!").setThumbnail(currentSong.thumbnail)
                ]
            })
        }
	},
}
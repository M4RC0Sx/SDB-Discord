import { Message, MessageEmbed } from "discord.js";
import { SDBClient } from "../../../SDBClient";
import { MAIN_COLOR } from "../../../util/config";

module.exports = async (client: SDBClient, message: Message) => {
  if (message.channel.type != "GUILD_TEXT") return; // Only Guild channels
  if (message.author.bot) return; // Ignore bots

  if (
    client.getAntiFloodTimeDiffSeconds(message.author.id) < 3 &&
    client.getAntiFloodTimeDiffSeconds(message.author.id) > 0
  ) {
    message.reply(
      "**Por favor, no escribas tan rápido en el chat.** *Eliminando mensaje...*"
    );
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      message.delete().catch(() => {});
    }, 1 * 1000);

    if (!client.user) return;
    const embed = new MessageEmbed()
      .setColor(MAIN_COLOR)
      .setAuthor({
        name: "SHINCHAN BOT - AntiSpam",
        iconURL: client.user.avatarURL() || undefined
      })
      .setDescription(`**Alerta sobre el usuario ${message.author}**.`)
      .addFields(
        { name: "Tag", value: message.author.tag, inline: true },
        { name: "ID", value: message.author.id, inline: true },
        {
          name: "Motivo",
          value: "Escritura demasiado rápida en el chat."
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Mensaje Original",
          value: message.content
        }
      )
      .setFooter({
        text: "SDBDiscord AntiSpam - By: M4RC0Sx",
        iconURL: client.user.avatarURL() || undefined
      })
      .setTimestamp();
    client.sendStaffLog(embed);
  }

  client.updateAntiFloodTime(message.author.id);
};

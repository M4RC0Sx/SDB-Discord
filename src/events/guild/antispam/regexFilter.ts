import { Message, MessageEmbed } from "discord.js";
import { SDBClient } from "../../../SDBClient";
import { MAIN_COLOR } from "../../../util/config";

const filters = [
  /(?:p|P)+(?:u|U)+(?:t|T)+(?:a|A|o|O|0|4)+/,
  /(?:n|N)+(?:a|A|4)+(?:z|Z)+(?:i|I|1|l|!|¡)+/,
  /(?:p|P)+(?:o|O|0)+(?:l|L|1)+(?:a|A|4)+/
];

module.exports = async (client: SDBClient, message: Message) => {
  if (message.channel.type != "GUILD_TEXT") return; // Only Guild channels
  if (message.author.bot) return; // Ignore bots

  const msgContent = message.content;
  for (const i in filters) {
    const resultMatch = msgContent.match(filters[i]);
    if (resultMatch) {
      message.reply(
        "**Cuidado, estás empleando una expresión prohibida en el chat.** *Eliminando mensaje...*"
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
            value: "Filtro de expresiones regulares."
          },
          {
            name: "Filtro",
            value: `${filters[i]}`
          },
          {
            name: "Coincidencia",
            value: `${resultMatch}`
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
      break;
    }
  }
};

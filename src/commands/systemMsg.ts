/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import {
  SlashCommandStringOption,
  SlashCommandBuilder
} from "@discordjs/builders";
import {
  CommandInteraction,
  GuildMember,
  MessageActionRow,
  MessageButton,
  MessageEmbed
} from "discord.js";

import { INSTAGRAM_USER, TIKTOK_URL, MAIN_COLOR } from "../util/config";
import { isAdmin } from "../util/utils";

export = {
  data: new SlashCommandBuilder()
    .setName("systemmsg")
    .setDescription("Enviar un mensaje de sistema.")
    //.setDefaultPermission(false)
    .addStringOption((opt: SlashCommandStringOption) =>
      opt
        .setName("tipo")
        .setDescription("Tipo del mensaje de sistema a enviar.")
        .setRequired(true)
        .addChoice("Clases", "clases")
    ),
  async execute(interaction: CommandInteraction) {
    const sender = interaction.member as GuildMember;

    if (!isAdmin(sender)) {
      await interaction.reply({
        content: "¡No tienes permisos para usar este comando!",
        ephemeral: true
      });
      return;
    }

    const bot = interaction.client.user;
    if (!bot) return;

    const type = interaction.options.getString("tipo") as string;
    switch (type) {
      case "clases": {
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("btn-join-class")
            .setLabel("¡Unirme a una Clase!")
            .setStyle("PRIMARY")
        );

        // Reply interaction
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setColor(MAIN_COLOR)
              .setAuthor({
                name: "SHINCHAN BOT - Clases",
                iconURL: bot.avatarURL() || undefined,
                url: TIKTOK_URL
              })
              .setDescription(
                `**¡Bienvenido al servidor oficial de ${INSTAGRAM_USER}!**\n\n ¡Haz click al botón para que se te asigne tu clase de forma aleatoria! \n*(Una vez asignada, no podrás cambiarte)*`
              )
              .setFooter({
                text: INSTAGRAM_USER,
                iconURL: bot.avatarURL() || undefined
              })
              .setTimestamp()
          ],
          components: [row]
        });
        break;
      }
      default:
        break;
    }
  }
};

/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { Class } from "../handlers/dbModels";
import { SDBClient } from "../SDBClient";

import {
  MAIN_COLOR,
  ROLE_ROSE_ID,
  ROLE_SUNFLOWER_ID,
  ROLE_CHERRY_ID
} from "../util/config";
import { isAdmin } from "../util/utils";

const classRoles = new Map();
classRoles.set("CEREZAS", ROLE_CHERRY_ID);
classRoles.set("GIRASOLES", ROLE_SUNFLOWER_ID);
classRoles.set("ROSAS", ROLE_ROSE_ID);

export = {
  data: new SlashCommandBuilder()
    .setName("points")
    .setDescription("Administrar sistema de puntos.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setDescription("Listar la tabla de puntuaciones.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Agregar puntos a una clase.")
        .addStringOption((option) =>
          option
            .setName("class")
            .setDescription("Clase a la que eliminar los puntos.")
            .setRequired(true)
            .addChoice("CEREZAS", "CEREZAS")
            .addChoice("GIRASOLES", "GIRASOLES")
            .addChoice("ROSAS", "ROSAS")
        )
        .addIntegerOption((option) =>
          option
            .setName("points")
            .setDescription("Cantidad de puntos a añadir.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Eliminar puntos a una clase.")
        .addStringOption((option) =>
          option
            .setName("class")
            .setDescription("Clase a la que eliminar los puntos.")
            .setRequired(true)
            .addChoice("CEREZAS", "CEREZAS")
            .addChoice("GIRASOLES", "GIRASOLES")
            .addChoice("ROSAS", "ROSAS")
        )
        .addIntegerOption((option) =>
          option
            .setName("points")
            .setDescription("Cantidad de puntos a eliminar.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Establecer los puntos de una clase.")
        .addStringOption((option) =>
          option
            .setName("class")
            .setDescription("Clase a la que eliminar los puntos.")
            .setRequired(true)
            .addChoice("CEREZAS", "CEREZAS")
            .addChoice("GIRASOLES", "GIRASOLES")
            .addChoice("ROSAS", "ROSAS")
        )
        .addIntegerOption((option) =>
          option
            .setName("points")
            .setDescription("Cantidad de puntos a establecer.")
            .setRequired(true)
        )
    ),
  async execute(interaction: CommandInteraction) {
    const sender = interaction.member as GuildMember;

    const client = interaction.client as SDBClient;
    const bot = client.user;
    if (!bot) return;

    const subCommand = interaction.options.getSubcommand();
    if (!subCommand) {
      return;
    }

    if (subCommand === "list") {
      const cherryModel = await Class.findOne({
        where: { name: "CEREZAS" }
      });
      const roseModel = await Class.findOne({
        where: { name: "ROSAS" }
      });
      const sunflowerModel = await Class.findOne({
        where: { name: "GIRASOLES" }
      });

      const cherryPoints = cherryModel ? cherryModel.getPoints() : 0;
      const sunflowerPoints = sunflowerModel ? sunflowerModel.getPoints() : 0;
      const rosePoints = roseModel ? roseModel.getPoints() : 0;

      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor(MAIN_COLOR)
            .setAuthor({
              name: "SHINCHAN BOT - Clases & Puntos",
              iconURL: bot.avatarURL() || undefined
            })
            .setThumbnail(bot.avatarURL() || "")
            .setDescription(
              `A continuación se muestra la tabla de puntuaciones, ${interaction.member}:`
            )
            .addField("CEREZOS", `${cherryPoints}`, true)
            .addField("GIRASOLES", `${sunflowerPoints}`, true)
            .addField("ROSAS", `${rosePoints}`, true)
            .setFooter({
              text: "SDBDiscord Puntos - By: M4RC0Sx",
              iconURL: bot.avatarURL() || undefined
            })
            .setTimestamp()
        ]
      });
      return;
    }

    if (!isAdmin(sender)) {
      await interaction.reply({
        content: "¡No tienes permisos para usar este comando!",
        ephemeral: true
      });
      return;
    }

    const points = interaction.options.getInteger("points");
    if (points && points < 0) {
      await interaction.reply({
        content: "**ERROR >>** ¡La cantidad de puntos no puede ser negativa!",
        ephemeral: true
      });
      return;
    }

    const className = interaction.options.getString("class") as string;
    let classModel = await Class.findOne({
      where: { name: className }
    });

    // If class does not exists, create it
    if (!classModel) {
      classModel = await Class.create({
        name: className,
        points: 0,
        role_id: classRoles.get(className)
      });
    }

    let description = "";
    switch (subCommand) {
      case "add": {
        await classModel.addPoints(points);
        description = `¡El administrador ${
          interaction.member
        } ha añadido ${points} puntos a la clase ${
          interaction.guild &&
          interaction.guild.roles.cache.get(classModel.role_id)
        }!`;
        break;
      }
      case "remove": {
        await classModel.removePoints(points);
        description = `¡El administrador ${
          interaction.member
        } ha eliminado ${points} puntos a la clase ${
          interaction.guild &&
          interaction.guild.roles.cache.get(classModel.role_id)
        }!`;
        break;
      }
      case "set": {
        await classModel.setPoints(points);
        description = `¡El administrador ${
          interaction.member
        } ha establecido los puntos de la clase ${
          interaction.guild &&
          interaction.guild.roles.cache.get(classModel.role_id)
        } en ${points}!`;
        break;
      }
      default: {
        break;
      }
    }

    await client.updateAllPointsCounter();

    // Reply interaction
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor(MAIN_COLOR)
          .setAuthor({
            name: "SHINCHAN BOT - Clases & Puntos",
            iconURL: bot.avatarURL() || undefined
          })
          .setThumbnail(bot.avatarURL() || "")
          .setDescription(description)
          .addField("Puntos actuales", `${classModel.getPoints()}`, true)
          .setFooter({
            text: "SDBDiscord Puntos - By: M4RC0Sx",
            iconURL: bot.avatarURL() || undefined
          })
          .setTimestamp()
      ]
    });
  }
};

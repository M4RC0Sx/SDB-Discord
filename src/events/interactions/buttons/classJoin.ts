/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import {
  Client,
  GuildMember,
  GuildMemberRoleManager,
  Interaction
} from "discord.js";

import {
  ROLE_ROSE_ID,
  ROLE_SUNFLOWER_ID,
  ROLE_CHERRY_ID
} from "../../../util/config";

import { isInClass } from "../../../util/utils";

module.exports = async (client: Client, interaction: Interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "btn-join-class") {
    // Check if already in class
    if (isInClass(interaction.member as GuildMember)) {
      await interaction.reply({
        content: "Se ha producido un error: ¡Ya tienes una clase asignada!",
        ephemeral: true
      });
      return;
    }

    if (!interaction.member || !interaction.guild) return;

    // Get random class
    const classRoles = [ROLE_ROSE_ID, ROLE_SUNFLOWER_ID, ROLE_CHERRY_ID];
    const randomClass =
      classRoles[Math.floor(Math.random() * classRoles.length)];

    const randomClassRole = interaction.guild.roles.cache.get(randomClass);
    if (!randomClassRole) return;

    await (interaction.member.roles as GuildMemberRoleManager).add(
      randomClassRole,
      "Automatic class role assignment."
    );
    await interaction.reply({
      content: `¡Enhorabuena ${interaction.member}! Se te ha asignado la clase **${randomClassRole}**.`,
      components: [],
      ephemeral: true
    });
  }
};

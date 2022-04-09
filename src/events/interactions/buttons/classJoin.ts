/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Client, GuildMember, GuildMemberResolvable, GuildMemberRoleManager, Interaction } from "discord.js";

const { ROLE_ROSE_ID, ROLE_SUNFLOWER_ID, ROLE_CHERRY_ID } = require('../../../util/config');

const { isInClass } = require('../../../util/utils');


module.exports = async (client: Client, interaction: Interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "btn-join-class") {

        // Check if already in class
        if (isInClass(interaction.member as GuildMember)) {
            await interaction.reply({
                content: 'Se ha producido un error: ¡Ya tienes una clase asignada!',
                ephemeral: true
            });
            return;
        }

        // Get random class
        const classRoles = [ROLE_ROSE_ID, ROLE_SUNFLOWER_ID, ROLE_CHERRY_ID];
        const randomClass = classRoles[Math.floor(Math.random() * classRoles.length)];
        const randomClassRole = interaction.guild!.roles.cache.get(randomClass)!;

        await (interaction.member!.roles as GuildMemberRoleManager).add(randomClassRole, 'Automatic class role assignment.');
        await interaction.reply({
            content: `¡Enhorabuena ${interaction.member}! Se te ha asignado la clase **${randomClassRole}**.`,
            components: [],
            ephemeral: true

        });
    }
}
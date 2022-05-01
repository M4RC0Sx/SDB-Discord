import {
  GuildMember,
  MessageActionRow,
  MessageButton,
  Permissions,
  TextChannel,
  MessageEmbed
} from "discord.js";
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes
} from "sequelize";
import { SDBClient } from "../SDBClient";

class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare name: string;
  declare role_id: string;
  declare points: number;

  async addPoints(points: number) {
    this.points += points;
    await this.save();
  }

  async removePoints(points: number) {
    this.points -= points;
    if (this.points < 0) this.points = 0;
    await this.save();
  }

  async setPoints(points: number) {
    this.points = points;
    await this.save();
  }

  getPoints(): number {
    return this.points;
  }
}

module.exports = (sequelize: Sequelize) => {
  return Class.init(
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      role_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    { sequelize }
  );
};

import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import AvatarModel from "./Avatar.model";

class TagsModel extends Model {
  public id!: string;
  public name!: string;
}

TagsModel.init(
  {
    id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "tags",
    sequelize,
  }
);

export default TagsModel;

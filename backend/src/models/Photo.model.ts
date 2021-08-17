import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import TagsModel from "./Tags.model";
import UserModel from "./User.model";

class PhotoModel extends Model {
  public id!: string;
  public secure_url!: string;
  public public_id!: string;
  public tags!: TagsModel[];
  public userId!: UserModel;
  public description!: string;
  public name!: string;
  public height!: string;
  public width!: string;
}

PhotoModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    width: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    secure_url: {
      type: DataTypes.STRING,
    },
    public_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "photos",
    timestamps: true,
  }
);

export default PhotoModel;

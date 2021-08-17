import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import UserModel from "./User.model";

class AvatarModel extends Model {
  public id!: string;
  public public_id!: string;
  public secure_url!: string;
  public userId!: UserModel;
}

AvatarModel.init(
  {
    id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    public_id: {
      type: DataTypes.STRING,
    },
    secure_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "avatars",
    timestamps: true,
    sequelize,
  }
);

export default AvatarModel;

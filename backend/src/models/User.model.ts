import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import AvatarModel from "./Avatar.model";
import PhotoModel from "./Photo.model";

class UserModel extends Model {
  public id!: string;
  public fullName!: string;
  public email!: string;
  public phone!: string;
  public description!: string;
  public provider!: string;
  public avatar!: AvatarModel;
  public password!: string;
  public photos!: PhotoModel[];
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING(280),
    },
    email: {
      type: DataTypes.STRING(280),
    },
    phone: {
      type: DataTypes.STRING(280),
    },
    description: {
      type: DataTypes.STRING(500),
    },
    provider: {
      type: DataTypes.STRING(280),
    },
    password: DataTypes.STRING(280),
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default UserModel;

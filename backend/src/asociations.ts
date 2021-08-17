import UserModel from "./models/User.model";
import AvatarModel from "./models/Avatar.model";
import PhotoModel from "./models/Photo.model";
import TagsModel from "./models/Tags.model";

UserModel.hasOne(AvatarModel, { as: "avatar", foreignKey: "userId" });
AvatarModel.belongsTo(UserModel, { as: "user" });

UserModel.hasMany(PhotoModel, { as: "photos", foreignKey: "userId" });
PhotoModel.belongsTo(UserModel, { as: "user" });

PhotoModel.hasMany(TagsModel, { as: "tags", foreignKey: "photoId" });
TagsModel.belongsTo(PhotoModel, { as: "photo" });

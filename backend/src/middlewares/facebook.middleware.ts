import { deserializeUser, serializeUser } from "passport";
import { Strategy } from "passport-facebook";
import { pusher } from "../app";
import { generateToken } from "../controllers/auth/generateToken";
import { environments } from "../environments/environments";
import UserModel from "../models/User.model";
import ui from "uniqid";
import AvatarModel from "../models/Avatar.model";

//Serializers
serializeUser((user, done) => {
    done(null, user);
});

deserializeUser((user, done) => {
    done(null, user as any);
});

//Initial configuration from passport for facebook
const facebookStrategy = new Strategy(
    {
        clientID: environments.FB.FB_ID,
        clientSecret: environments.FB.FB_SECRET,
        callbackURL: "/api/auth/facebook",

        profileFields: ["email", "displayName"],
    },

    async (token, refreshToken, profile, done) => {
        try {
            //Getting information facebook profile
            const { email, name } = profile?._json;
            const idAvatar = ui();
            const idUser = ui();

            //Validating if email exist
            if (email) {
                const user = await UserModel.findOne({
                    where: {
                        email,
                    },
                });

                //Validating if user exist
                if (user) {
                    pusher.trigger("my-gallery", "login-facebook", {
                        token: generateToken(user),
                        message: "User Logged",
                    });
                    return done(null, user);
                }
            }

            //Serching a user by name
            const user = await UserModel.findOne({
                where: {
                    fullName: name,
                },
            });

            //Getting token if user already exists
            if (user) {
                pusher.trigger("my-gallery", "login-facebook", {
                    token: generateToken(user),
                    message: "User Logged",
                });
                return done(null, user);
            }

            //Creating a new user
            const newUser = await UserModel.create({
                id: idUser,
                email: email ? email : "",
                fullName: name,
                provider: "facebook",
            });

            //Creating avatar model
            await AvatarModel.create({
                id: idAvatar,
                secure_url: environments.DEFAULT.PHOTO,
                userId: idUser,
            });

            //Pusher handler to send token
            pusher.trigger("my-gallery", "register-facebook", {
                token: generateToken(newUser),
                message: "User Registered and Logged",
            });

            return done(null, newUser);
        } catch (err) {
            return done(err, false);
        }
    }
);

export default facebookStrategy;

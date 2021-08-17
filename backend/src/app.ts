import express from "express";
import cors from "cors";
import Database from "./database";
import morgan from "morgan";
import passport from "passport";
import ApiRoutes from "./routes/api-router";
import JWTMiddleware from "./middlewares/jwt.middleware";
import FacebookMiddleware from "./middlewares/facebook.middleware";
import { environments } from "./environments/environments";
import Pusher from "pusher";
import cloudinary from "cloudinary";
import "./asociations";

//Pusher Configuration
export const pusher = new Pusher({
  appId: environments.PUSHER.PUSHER_APP_ID,
  key: environments.PUSHER.PUSHER_KEY,
  secret: environments.PUSHER.PUSHER_SECRET,
  cluster: "us2",
  useTLS: true,
});

//Cloudinary Configuration
const options: cloudinary.ConfigOptions = {
  api_key: environments.CD.CD_API_KEY,
  api_secret: environments.CD.CD_API_SECRET,
  cloud_name: "dder8kjda",
};
cloudinary.v2.config(options);

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use("jwt_strategy", JWTMiddleware);
passport.use("facebook_strategy", FacebookMiddleware);

app.use("/api", ApiRoutes);

//Main Router
app.use("/", (req, res) => {
  return res.json({
    status: true,
    message: "Api is working",
  });
});


//Start to listen de Server
app.listen(environments.PORT, async () => {
  try {
    console.log(`Serve on port ${environments.PORT}`);
    await Database.authenticate();
    console.log("Database is connected");
    await Database.sync({ force: false });
  } catch (err) {
    console.log("ERROR", { ...err });
  }
});

export default app;

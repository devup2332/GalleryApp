import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { environments } from "../environments/environments";
import UserModel from "../models/User.model";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: environments.JWT.JWT_SECRET,
};

const jwtStrategy = new Strategy(opts, async (payload, done) => {
  const user = await UserModel.findOne({
    where: {
      id: payload.id,
    },
  });

  if (user) {
    return done(null, user);
  }

  return done(null, false);
});

export default jwtStrategy;

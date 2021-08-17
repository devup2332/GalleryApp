import UserInstace from "../../models/User.model";
import JWT from "jsonwebtoken";
import { environments } from "../../environments/environments";

export const generateToken = (user: any) => {
  return JWT.sign(
    { id: user.id, email: user.email },
    environments.JWT.JWT_SECRET
  );
};

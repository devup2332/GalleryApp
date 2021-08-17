import { Credentials } from "../Interfaces/Creadentials";

export interface FormLoginProps {
  loginUser: (credential: Credentials) => void;
  loading: boolean;
}

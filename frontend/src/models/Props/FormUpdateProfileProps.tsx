import { UserProfile } from "../Interfaces/UserProfile";

export interface FormUpdateProfileProps {
  user: UserProfile;
  updateUser: any;
  loading: boolean;
}

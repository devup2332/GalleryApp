import { UserProfile } from "./UserProfile";

export interface Photo {
  secure_url?: string;
  public_id?: string;
  id?: number;
  user: UserProfile;
  updatedAt: Date;
  createdAt: Date;
  width: string | number;
  height: string | number;
}

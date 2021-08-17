import { Photo } from "./Photo";

export interface UserProfile {
  id?: string | number;
  fullName: string;
  avatar: Avatar;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  provider: string;
  password: string;
  phone: string;
  photos: Photo[];
  description?: string;
}

export interface Avatar {
  secure_url: string;
  public_id: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

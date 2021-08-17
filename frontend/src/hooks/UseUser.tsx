import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { environments } from "../environments";
import { Photo } from "../models/Interfaces/Photo";
import { UserProfile } from "../models/Interfaces/UserProfile";

export const useUser = () => {
  const [user, setUser] = useState<UserProfile>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const token = localStorage.getItem("t1ks1ehn");
  let userVar: UserProfile | undefined;

  const { location } = useHistory();

  const getUserPhotos = async () => {
    try {
      const { data } = await axios.get(`${environments.api_uri}/photos/${userVar?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return setPhotos(data.photos);
    } catch (err) {
      throw new Error("Server dosent respond");
    }
  };

  const getUser = async () => {
    const token = localStorage.getItem("t1ks1ehn");
    try {
      if (token) {
        const { data } = await axios.get(
          `${environments.api_uri}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        userVar = data.user
        setUser(data.user);

        if (location.pathname === "/profile") {
          getUserPhotos();
        }
        return
      }
    } catch (err) {
      throw new Error("Server dosent respond");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, photos, getUser, getUserPhotos };
};

export default useUser;

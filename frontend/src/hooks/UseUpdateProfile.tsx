import axios from "axios";
import { useParams } from "react-router";
import { environments } from "../environments";
import { UserProfile } from "../models/Interfaces/UserProfile";

const useUpdateUser = () => {
  const token = localStorage.getItem("t1ks1ehn");
  const { id } = useParams() as any;

  const updateProfile = async (user: UserProfile) => {
    const { data } = await axios.put(
      `${environments.api_uri}/user/update/${id}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  return { update: updateProfile };
};

export default useUpdateUser;

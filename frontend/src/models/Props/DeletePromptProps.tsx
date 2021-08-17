import { Photo } from "../Interfaces/Photo";

export interface DeletePromptProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photo: Photo;
  setOpenSnack: React.Dispatch<React.SetStateAction<boolean>>;
}

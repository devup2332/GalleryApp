import { Photo } from "../Interfaces/Photo";

export interface SliderImageProps {
  photos: Photo[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

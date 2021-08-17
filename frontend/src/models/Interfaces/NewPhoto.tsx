import { Tag } from "./Tag";

export interface NewPhoto {
  description: string;
  image?: FileList;
  name: string;
  tags: Tag[];
}

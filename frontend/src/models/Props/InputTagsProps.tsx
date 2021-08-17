import { Tag } from "../Interfaces/Tag";

export interface InputTagsProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  register: any;
}

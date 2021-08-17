import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { environments } from "../environments";
import { Tag } from "../models/Interfaces/Tag";

let apiOptions: any[];
let i = Date.now();

const UseTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [autocompleteOptions, setAutocompleOptions] = useState<any[]>([]);
  const containerOptions = useRef<HTMLDivElement>(null);

  const handleOption = (option: any, setValue: any) => {
    setAutocompleOptions(apiOptions);
    const array = tags;
    const tag = array.find((tag) => {
      return tag.name === option.name;
    });

    if (tag) {
      return containerOptions.current?.classList.remove("on");
    }
    containerOptions.current?.classList.remove("on");
    setTags([...tags, option]);
    setValue("tags", "");
    return;
  };

  const openContainerOptions = () => {
    containerOptions.current?.classList.add("on");

    document.addEventListener("click", (e) => {
      if (
        !containerOptions.current?.contains(e.target as Node) &&
        !document
          .querySelector(".tags_controller_subcontainer")
          ?.contains(e.target as Node)
      ) {
        containerOptions.current?.classList.remove("on");
      }
    });
  };

  const deletTag = (tag: any) => {
    const array = tags;

    setTags(
      array.filter((tagd) => {
        return tagd.name !== tag.name;
      })
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const w = e.target.value;

    const newOptions = apiOptions.filter((o) => {
      return o.name.toLowerCase().indexOf(w) !== -1;
    });

    if (newOptions.length === 0) {
      setAutocompleOptions([
        {
          id: i,
          name: w,
        },
      ]);
      i++;
      return;
    }

    setAutocompleOptions(newOptions);
  };

  const getTags = async () => {
    const token = localStorage.getItem("t1ks1ehn");
    const { data } = await axios.get(`${environments.api_uri}/user/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    apiOptions = data.options;
    setAutocompleOptions(data.options);
    return data.options;
  };

  useEffect(() => {
    getTags();
  }, []);

  return {
    handleInputChange,
    deletTag,
    handleOption,
    tags,
    autocompleteOptions,
    openContainerOptions,
    containerOptions,
    setTags,
  };
};

export default UseTags;

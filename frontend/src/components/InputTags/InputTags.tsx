import axios from "axios";
import "./InputTags.scss";
import React, { useEffect, useState } from "react";
import { environments } from "../../environments";
import { Tag } from "../../models/Interfaces/Tag";
import { ReactComponent as CloseSvg } from "../../assets/icons/close.svg";
import { InputTagsProps } from "../../models/Props/InputTagsProps";
import { useRef } from "react";

let localTags: Tag[];

const InputTags = ({ register, setTags, tags }: InputTagsProps) => {
  const [apiTags, setApiTags] = useState<Tag[]>([]);
  const container = document.querySelector(".autocomplete-container");
  const inputRef = useRef<HTMLInputElement>(null);

  const selectTag = (tag: Tag) => {
    const container = document.querySelector(".autocomplete-container");
    const input = document.querySelector<HTMLInputElement>(".inputTags");

    const match = tags.find((select: Tag) => {
      return select.name === tag.name;
    });

    if (match) return container?.classList.remove("on");
    setTags([...tags, tag]);

    container?.classList.remove("on");
    if (input) {
      input.value = "";
    }
  };

  const closeOptions = (e?: MouseEvent) => {
    if (
      !document
        .querySelector(".input-tags-container")
        ?.contains(e?.target as Node)
    ) {
      container?.classList.remove("on");
    }
  };

  const openOptions = () => {
    container?.classList.add("on");

    document.addEventListener("click", closeOptions, { once: true });
  };

  const deletTag = (tag: Tag) => {
    const newTags = tags.filter((item) => {
      return item.name !== tag.name;
    });

    setTags(newTags);
  };

  const handleChange = (e: any) => {
    openOptions();
    const text = e.target.value;
    const input = document.querySelector<HTMLInputElement>(".inputTags");

    let i = Date.now();

    input?.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Enter") {
          setTags([
            ...tags,
            {
              name: text,
              id: i,
            },
          ]);
          input.value = "";
          container?.classList.remove("on");
        }

        return;
      },
      {
        once: true,
      }
    );

    const newOptions = localTags.filter((tag) => {
      return tag.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });

    if (newOptions.length === 0) {
      setApiTags([
        {
          name: text,
          id: i,
        },
      ]);
      i++;
      return;
    }

    setApiTags(newOptions);
  };

  const getTags = async () => {
    const token = localStorage.getItem("t1ks1ehn");
    const { data } = await axios.get(`${environments.api_uri}/user/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localTags = data.options;
    setApiTags(data.options);
    return data.options;
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="input-tags-container">
      {tags.map((tag: Tag) => {
        return (
          <span key={tag.id}>
            {tag.name} <CloseSvg onClick={() => deletTag(tag)} />
          </span>
        );
      })}
      <input
        {...register("tags", {
          validate: {
            noVoid: () => {
              if (tags.length > 0) {
                return true;
              }
              return "Enter at least 1 tag";
            },
          },
        })}
        ref={inputRef}
        type="text"
        onChange={handleChange}
        placeholder="Tags"
        className="inputTags"
        autoComplete="off"
        name="tags"
      />
      <div className="autocomplete-container">
        {apiTags?.slice(0, 5).map((option) => {
          return (
            <p
              className="option"
              key={option.id}
              onClick={() => selectTag(option)}
            >
              {option.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default InputTags;

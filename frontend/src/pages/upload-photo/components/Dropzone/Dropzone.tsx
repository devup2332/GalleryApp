import React, { ChangeEvent, Fragment, useEffect, useRef } from "react";
import { DropzneProps } from "../../../../models/Props/DropzoneProps";
import { ReactComponent as CameraSVG } from "../../../../assets/icons/logo_movile.svg";
import { useState } from "react";

const Dropzone = ({ register }: DropzneProps) => {
  const [url, setUrl] = useState<string | null | ArrayBuffer>("");
  const dropSection = useRef<HTMLDivElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);

  //Handler for set prevew image in uplaod image page
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    //Getting input that capture file dropped

    //Prevent default browser behavior
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    //Setting style when user is dropping a photo
    const setStyle = () => {
      dropSection.current?.classList.add("on");
    };

    const dropStyle = () => {
      dropSection.current?.classList.remove("on");
    };

    //Reading the file route to display a preview in the box
    const readImage = (e: DragEvent) => {
      const inputFile = document.querySelector<HTMLInputElement>(".inputFile");
      const file = e.dataTransfer?.files[0];

      const dt = new DataTransfer();

      if (!file || !inputFile) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result);
      };

      reader.readAsDataURL(file);

      dt.items.add(file);
      inputFile.files = dt.files;

      return;
    };

    //Handlers to activate the effect of drop
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropSection.current?.addEventListener(eventName, preventDefaults);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropSection.current?.addEventListener(eventName, setStyle);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropSection.current?.addEventListener(eventName, dropStyle);
    });
    dropSection.current?.addEventListener("drop", readImage);

    //Removing effects to mantein clean the memory
    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropSection.current?.removeEventListener(eventName, preventDefaults);
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        dropSection.current?.removeEventListener(eventName, setStyle);
      });

      ["dragleave", "drop"].forEach((eventName) => {
        dropSection.current?.removeEventListener(eventName, dropStyle);
      });
      dropSection.current?.removeEventListener("drop", readImage);
    };
  }, []);
  return (
    <Fragment>
      <div
        className="dropzone"
        onClick={() =>
          document.querySelector<HTMLInputElement>(".inputFile")?.click()
        }
        ref={dropSection}
        style={{
          minHeight: inputFile.current?.value ? "fit-content" : "300px",
        }}
      >
        {!document.querySelector<HTMLInputElement>(".inputFile")?.value ? (
          <div className="body-dropzone">
            <CameraSVG />
            <p className="text-dropzone">Drop here your photo</p>
          </div>
        ) : (
          <img src={url?.toString()} alt="" />
        )}
      </div>
      <input
        {...register("image", {
          required: {
            value: true,
            message: "Please enter your image",
          },
        })}
        type="file"
        className="inputFile"
        //Im using on input just in this ocassion because useReactForm is using onChange to handle de image
        onInput={handleChange}
      />
    </Fragment>
  );
};

export default Dropzone;

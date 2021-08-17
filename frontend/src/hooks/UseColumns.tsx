import { useEffect, useState } from "react";
import { Photo } from "../models/Interfaces/Photo";

interface Column {
  id: number;
  photos: Photo[];
}

let array: Column[] = [];
let col: number;

const UseColumns = (photos: Photo[]) => {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const setImages = (columns: number) => {
      array = [];
      col = 0;
      setColumns([]);
      for (let i = 0; i < columns; i++) {
        array.push({
          id: i,
          photos: [],
        });
      }

      photos.forEach((photo) => {
        if (col < columns) {
          array[col].photos?.push(photo);
          col++;
          return;
        }
        col = 0;
        array[col].photos?.push(photo);
        col++;
      });
      setColumns(array);
    };

    const ResizeHandler = () => {
      const width = document.documentElement.clientWidth + 15;
      if (width >= 360 && width < 600) {
        setImages(1);
      }

      if (width >= 600 && width < 1200) {
        setImages(2);
      }

      if (width >= 1200) {
        setImages(3);
      }
    };

    window.addEventListener("resize", ResizeHandler);
    ResizeHandler();

    return () => {
      window.removeEventListener("resize", ResizeHandler);
    };
  }, [photos]);

  return { columns };
};

export default UseColumns;

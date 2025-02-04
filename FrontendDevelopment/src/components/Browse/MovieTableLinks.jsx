import React from "react";
import { Link } from "react-router-dom";

export const MovieTableLinks = ({ items, itemIds, basePath }) => {
  const itemArray = items.split(", ").slice(0, 3);
  const itemIdArray = itemIds ? itemIds.split(", ") : [];

  return (
    <>
      {itemArray.map((item, index) => {
        const itemId = itemIdArray[index] || item; // Fallback to item if no ID
        return (
          <React.Fragment key={itemId}>
            <Link
              to={`${basePath}/${itemId}`}
              className="hover:text-fabflix-primary transition duration-300 ease-in-out"
            >
              {item}
            </Link>
            {index < itemArray.length - 1 && ", "}
          </React.Fragment>
        );
      })}
    </>
  );
};

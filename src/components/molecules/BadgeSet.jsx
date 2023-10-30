import React, { useState, useEffect } from "react";
import { Badge } from "../atoms/Badge";

export const BadgeSet = ({ keywords, onSelectKeyword }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (id, isSelected) => {
    setSelectedIds((prev) => {
      if (isSelected) {
        return [...prev, id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  useEffect(() => {
    onSelectKeyword(selectedIds);
  }, [selectedIds, onSelectKeyword]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {keywords.map((keyword) => (
        <Badge
          key={keyword.id}
          id={keyword.id}
          label={keyword.keyword}
          onClick={handleSelect}
        />
      ))}
    </div>
  );
};

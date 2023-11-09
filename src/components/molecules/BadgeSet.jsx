import React, { useState } from "react";
import { Badge } from "../atoms/Badge";

export const BadgeSet = ({ keywords, onSelectKeyword }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (id, isSelected) => {
    if (isSelected) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
    onSelectKeyword(selectedIds);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {keywords.map((keyword) => (
        <Badge
          key={keyword.id}
          id={keyword.id}
          label={keyword.keyword}
          onClick={(id, isSelected) => handleSelect(id, isSelected)}
        />
      ))}
    </div>
  );
};

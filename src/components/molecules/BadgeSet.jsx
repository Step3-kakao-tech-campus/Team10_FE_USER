import { Badge } from "../atoms/Badge";

export const BadgeSet = ({ keywords }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {keywords.map((keyword) => (
        <Badge key={keyword.id} id={keyword.id} label={keyword.keyword} />
      ))}
    </div>
  );
};

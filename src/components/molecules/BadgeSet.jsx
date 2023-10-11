import { Badge } from "../atoms/Badge";

export const BadgeSet = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row gap-1">
        <Badge label="사장님이 친절해요" />
        <Badge label="간단한 용품을 팔아요" />
      </div>
      <div className="flex flex-row gap-1">
        <Badge label="휴게공간이 있어요" />
        <Badge label="가격이 합리적이에요" />
      </div>
      <div className="flex flex-row gap-1">
        <Badge label="타이어 공기를 넣을 수 있어요" />
        <Badge label="매장이 깨끗해요" />
      </div>
      <div className="flex flex-row gap-1">
        <Badge label="여름엔 시원하고 겨울엔 따뜻해요" />
      </div>
    </div>
  );
};

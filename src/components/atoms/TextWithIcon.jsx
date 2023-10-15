/**
 * @param iconsrc : 아이콘의 위치,
 * @param text : 들어갈 문구
 */

export const TextWithIcon = ({ iconsrc, text, className }) => {
  return (
    <div className={`h-6 items-left gap-1 inline-flex ${className}`}>
      <picture className="relative w-6 h-6">
        <img className="w-6 h-6" src={iconsrc} />
        {/* src 변수로 가져오기 */}
      </picture>
      <div className="text-black text-[15px] font-semibold">{text}</div>
      {/* div 안 내용 변수로 가져오기 */}
    </div>
  );
};

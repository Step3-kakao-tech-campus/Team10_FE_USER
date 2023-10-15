import React from "react";

export const Button = ({
  type = "long",
  className,
  onClick,
  label,
  icon,
  href,
  ...props
}) => {
  const handleButtonClick = () => {
    if (type === "cancel") {
      // 여기서 팝업을 트리거할 수 있습니다.
      onClick(); // onClick prop은 모달 디스플레이 로직을 처리한다고 가정합니다.
    } else if (type === "review") {
      window.location.href = "/reviewpost"; // 이것은 reviewpost 페이지로 리다이렉트합니다.
    }
  };
  const getType = (type) => {
    switch (type) {
      case "long":
        return "block w-full h-14 p-4 bg-primary text-white font-semibold rounded-none";
      case "small":
        return "block w-28 h-14 bg-sky-100 text-sky-500 font-semibold rounded-xl";
      case "home":
        return "relative flex items-start w-full h-20 bg-white p-4 text-left break-keep overflow-hidden shadow-xl rounded-xl";
      case "cancel":
        return "w-12 h-20 px-2 py-5 rounded-xl items-center text-white text-xs bg-slate-500 ml-auto mr-4";
      case "review":
        return "w-12 h-20 px-2 py-5 rounded-xl items-center text-white text-xs bg-red-400 ml-auto mr-4";
    }
  };

  return (
    <button
      type="button"
      href={href}
      className={`${getType(type)} ${className}`}
      onClick={handleButtonClick}
      {...props}
    >
      <img src={icon} className="absolute right-0 top-8" />
      {label}
    </button>
  );
};

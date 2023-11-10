import { useNavigate } from "react-router-dom";
import BackImg from "/GNB/Back.svg";

const StatusBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-50 w-full p-4 bg-white h-14">
      <img src={BackImg} alt="뒤로가기" onClick={() => navigate(-1)} />
    </nav>
  );
};

export default StatusBar;

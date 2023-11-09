import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="m-8 text-2xl font-bold"> 페이지를 찾을 수 없습니다 </div>
      <Button variant="long" onClick={() => navigate("/")}>
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFoundPage;

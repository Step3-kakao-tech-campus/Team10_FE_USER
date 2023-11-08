import { Button } from "../components/atoms/Button";

const NotFoundPage = () => {
  return (
    <div>
      <div className="m-8 text-2xl font-bold"> 페이지를 찾을 수 없습니다 </div>
      <Button variant="long">홈으로 돌아가기</Button>
    </div>
  );
};

export default NotFoundPage;

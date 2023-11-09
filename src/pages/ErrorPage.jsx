import { Button } from "../components/atoms/Button";

const ErrorPage = () => {
  return (
    <div>
      <div className="m-8 text-2xl font-bold"> Unauthorized!! </div>
      <Button variant="long">홈으로 돌아가기</Button>
    </div>
  );
};

export default ErrorPage;

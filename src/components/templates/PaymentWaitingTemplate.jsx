import { Button } from "../atoms/Button";
const PaymentWaitingTemplate = () => {
  return (
    <div>
      <div>결제가 진행중입니다....!</div>
      <Button variant="long" className="fixed bottom-0 left-0">
        결제가 완료되었으면 클릭하세요!
      </Button>
    </div>
  );
};
export default PaymentWaitingTemplate;

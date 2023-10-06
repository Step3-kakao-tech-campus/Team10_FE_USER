import KakaoMap from "../components/atoms/KakaoMap";
import { Bottomsheet } from "../components/atoms/Bottomsheet";
import StoreItem from "../components/molecules/StoreItem";
import { Input } from "../components/atoms/Input";

const ReservationPage = () => {
  return (
    <div>
      <div className="w-screen h-screen bg-white flex items-end gap-0">
        <KakaoMap className="z-0 w-screen h-screen absolute" />
        <Bottomsheet className="z-10 flex flex-col gap-3">
          <Input placeholder="검색"></Input>

          <StoreItem
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/4/4d/Carwas.jpg"
            storename="포세이돈워시"
            starcount="2.4"
            reviewcount="35"
            priceinfo="15,000원/60분"
            distance="1.3"
          ></StoreItem>
          <StoreItem
            imgsrc="https://upload.wikimedia.org/wikipedia/commons/4/4d/Carwas.jpg"
            storename="포세이돈워시"
            starcount="2.4"
            reviewcount="35"
            priceinfo="15,000원/60분"
            distance="1.3"
          ></StoreItem>
        </Bottomsheet>
      </div>
    </div>
  );
};

export default ReservationPage;
